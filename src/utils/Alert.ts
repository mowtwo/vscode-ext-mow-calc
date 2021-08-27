import { window } from "vscode";

export function infoMsg(msg: string) {
  window.showInformationMessage(msg)
}
export function errorMsg(msg: string) {
  window.showErrorMessage(msg)
}