/**
 * cookieを設置
 * @param {string} name cookie 名前
 * @param {string} value cookie 值
 * @param {number} days 有効期間
 */
export function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie =
        name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}
