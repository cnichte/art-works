interface External_Link_Props {
  children: any;
  props: any;
}

/**
 * Is used to open rendered Markdown links in the external default browser.
 * 
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @version 1.0.0
 *
 * @see ViewTools.getMyFuckingValueFrom
 * @param props 
 * @returns 
 */
export function External_Link(props:External_Link_Props) {

  /**
   * request to open a link in the external browser.
   * 
   * @param href 
   */
  function open_external_link(href: string): void {
    window.electronAPI.send("ipc-external-link", [href]);
  }

  return <a onClick={() => open_external_link(props.props.href)}>{props.children}</a>;
}
