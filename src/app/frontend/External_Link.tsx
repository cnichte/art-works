interface External_Link_Props {
  children: any;
  props: any;
}

export function External_Link(props:External_Link_Props) {

  function open_external_link(href: string): void {
    window.electronAPI.send("ipc-external-link", [href]);
  }

  return <a onClick={() => open_external_link(props.props.href)}>{props.children}</a>;
}
