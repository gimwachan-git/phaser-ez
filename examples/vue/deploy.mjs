import { Client } from "basic-ftp";
import jsonfile from "jsonfile";
import fs from "fs/promises";
import path from "path";

const ftpConfig = jsonfile.readFileSync(".ftpconfig");

// 以下の変数をあなたのFTPサーバーの情報に置き換えてください
const FTP_SERVER = ftpConfig.FTP_SERVER;
const FTP_USER = ftpConfig.FTP_USER;
const FTP_PASS = ftpConfig.FTP_PASS;
const remoteDirectory = ftpConfig.remoteDirectory;
const localDirectory = ftpConfig.localDirectory;

// FTPクライアントを作成
const ftpClient = new Client();

// 黒色と太字のANSIエスケープコードを設定
const blackBold = "\x1b[30;1m";
// 赤色と太字のANSIエスケープコードを設定
const redBold = "\x1b[31;1m";
// 緑色と太字のANSIエスケープコードを設定
const greenBold = "\x1b[32;1m";

// ANSIエスケープコードでスタイルをリセット
const resetStyle = "\x1b[0m";

// アップロードに失敗したファイルのリストを保存
const failedFiles = [];

// フォルダーを再帰的に削除する
async function clearWorkingDir(dir) {
  try {
    await ftpClient.cd(dir);
    const items = await ftpClient.list();
    for (const item of items) {
      if (item.isDirectory) {
        await clearWorkingDir(item.name);
        await ftpClient.cd("..");
        await ftpClient.removeDir(item.name);
      } else {
        await ftpClient.remove(item.name);
      }
    }
  } catch (err) {
    console.error(
      `ディレクトリ ${dir} が存在しないかアクセスできません。エラーメッセージ: ${err.message}`
    );
  }
}

// フォルダー内のすべてのファイルを再帰的にアップロードする
async function uploadDir(localDirPath, remoteDirPath) {
  let localFilePath;
  try {
    // debug
    // ftpClient.ftp.verbose = true;
    const files = await fs.readdir(localDirPath);

    for (const file of files) {
      if (file === ".DS_Store") {
        // .DS_Storeファイルを無視する
        continue;
      }
      const localFilePath = path.join(localDirPath, file);
      const remoteFilePath = path.join(remoteDirPath, file);

      const stat = await fs.stat(localFilePath);
      if (stat.isDirectory()) {
        // リモートディレクトリが存在することを確認してから再帰的にアップロード
        await ftpClient.ensureDir(remoteFilePath);
        await uploadDir(localFilePath, remoteFilePath); // サブフォルダーを再帰的に処理
      } else {
        await ftpClient.uploadFrom(localFilePath, remoteFilePath, "overwrite"); // 既存のファイルを上書き
        console.log(
          blackBold,
          `FTPサーバーに ${localFilePath} をアップロードしました。`,
          resetStyle
        );
      }
    }
  } catch (err) {
    // アップロードに失敗したファイルをリストに追加
    failedFiles.push(localFilePath);

    // エラー処理時に赤色と太字のスタイルを使用
    console.error(
      redBold,
      "ファイルのアップロード中にエラーが発生しました。",
      err,
      resetStyle
    );
  }
}

// FTPサーバーに接続してファイルをアップロード
async function connectAndUpload() {
  // debug
  // ftpClient.ftp.verbose = true;
  let error = false;
  try {
    await ftpClient.access({
      host: FTP_SERVER,
      user: FTP_USER,
      password: FTP_PASS,
    });
    console.log(`FTPサーバー ${FTP_SERVER} に接続しました。`);
    await ftpClient.ensureDir(remoteDirectory);
    console.log(
      blackBold,
      `「${remoteDirectory}」フォルダーを削除しています。`,
      resetStyle
    );
    await clearWorkingDir(remoteDirectory);
    console.log(
      blackBold,
      `「${remoteDirectory}」フォルダーを削除しました。`,
      resetStyle
    );
    await uploadDir(localDirectory, remoteDirectory);
  } catch (err) {
    error = true;
    console.error("ファイルのアップロード中にエラーが発生しました。", err);
    return;
  } finally {
    ftpClient.close();
    // アップロードに失敗したファイルのリストを出力
    if (!error) {
      if (failedFiles.length > 0) {
        console.error(
          redBold,
          "以下のファイルのアップロードに失敗しました:",
          resetStyle
        );
        failedFiles.forEach((file) => {
          console.error(redBold, file, resetStyle);
        });
      } else {
        // 失敗したファイルがない場合、「すべてのファイルが正常にアップロードされました！」と表示
        // get now dateandtime
        const now = new Date();
        const year = now.getFullYear();
        const month = ("0" + (now.getMonth() + 1)).slice(-2);
        const day = ("0" + now.getDate()).slice(-2);
        const hour = ("0" + now.getHours()).slice(-2);
        const minute = ("0" + now.getMinutes()).slice(-2);
        const second = ("0" + now.getSeconds()).slice(-2);
        const nowDateandTime = `${year}/${month}/${day} ${hour}:${minute}:${second}`;
        console.log(
          greenBold,
          `${nowDateandTime} すべてのファイルが正常にアップロードされました！`,
          resetStyle
        );
      }
    }
  }
}

// FTPサーバーに接続してファイルをアップロード
connectAndUpload();
