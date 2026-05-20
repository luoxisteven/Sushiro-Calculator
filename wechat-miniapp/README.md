# Sushiro Calculator — WeChat Mini Program

WeChat mini-program port of the React web app at the repo root. Same features:
plate counters (¥8 / ¥10 / ¥15 / ¥20 / ¥28), people count, free-form other
items, total, per-person split, message, reset.

## Run

1. Install [WeChat DevTools (微信开发者工具)](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html).
2. In DevTools, choose **Import Project**.
3. Project directory: this `wechat-miniapp` folder.
4. AppID: pick **Use test account (使用测试号)** — or paste your own AppID and
   update `project.config.json` → `appid`.
5. Click **Import** to open the project. The simulator should render
   `pages/index/index`.

## File layout

```
wechat-miniapp/
├── app.js                  # app entry, pings nonuser API on launch
├── app.json                # pages registry + global window
├── app.wxss                # global styles (page background, fonts)
├── project.config.json     # DevTools project settings
├── project.private.config.json
├── sitemap.json
└── pages/
    └── index/              # the calculator screen
        ├── index.js
        ├── index.json
        ├── index.wxml
        └── index.wxss
```

## Notes

- `wx.request` to `api.xiluo.net` is fired on `onLaunch` (matches the web app's
  nonuser ping). For production, add the host to the mini-program's request
  domain allow-list in the WeChat admin console; for local dev the DevTools
  setting `urlCheck: false` already lets it through.
- Amount inputs use `type="digit"` (numeric keypad). Non-digits get stripped
  on input; values are normalized to non-negative integers on blur.
- The "buy me a coffee" link copies the URL to clipboard (mini-programs cannot
  open arbitrary external URLs).
