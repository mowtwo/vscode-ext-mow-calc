import { readFile } from "fs";
import { join, resolve as pathResolve } from "path";
import { ExtensionContext, Uri, WebviewPanel } from "vscode";
import Config from "./Config";
import * as pug from "pug"

export default function getWebViewContent(ctx: ExtensionContext, viewName: string): Promise<string> {
  const onDiskPath = Uri.file(
    join(ctx.extensionPath, Config.staticPage, `${viewName}.pug`)
  ).with({ scheme: 'vscode-resource' })
  return new Promise((resolve, reject) => {
    readFile(onDiskPath.fsPath, { encoding: 'utf-8' }, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

export function compileViewContent(temp: string, localObj: pug.LocalsObject, options?: pug.Options) {
  const c = pug.compile(temp, options ?? {})
  return c(localObj)
}

export function parseResUri(ctx: ExtensionContext, panel: WebviewPanel, resUri: string) {
  const onDiskPath = Uri.file(
    join(ctx.extensionPath, Config.static, resUri)
  )
  return panel.webview.asWebviewUri(onDiskPath).toString()
}