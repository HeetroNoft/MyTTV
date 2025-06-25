if (localStorage.getItem("myttv_vodsub_enabled") !== "false") {
  function injectScript(src) {
    const s = document.createElement("script");
    s.src = chrome.runtime.getURL(src);
    s.onload = () => s.remove();
    (document.head || document.documentElement).append(s);
  }

  const extensionType = window.chrome !== undefined ? "chrome" : "firefox";

  console.log("[MyTTV/TNS] Found extension type : " + extensionType);

  injectScript(`scripts/vod-sub/src/${extensionType}/app.js`);
  injectScript("scripts/vod-sub/src/app.js");
}
// File originally part of TwitchNoSub (https://github.com/besuper/TwitchNoSub)
// Copyright 2022 besuper
// Modified by HeetroNoft for integration into MyTTV (https://github.com/HeetroNoft/MyTTV)
