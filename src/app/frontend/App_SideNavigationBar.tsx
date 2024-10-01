import { useNavigate } from "react-router";
import { Menu, MenuProps } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  UserOutlined,
  HeartOutlined,
  BankOutlined,
  CoffeeOutlined,
  CrownOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import {
  RouteType,
  CATALOG_ROUTE_LIST,
  ARTIST_ROUTE_LIST,
  NOTE_ROUTE_LIST,
  GROUPOFWORK_ROUTE_LIST,
  COMPILATION_ROUTE_LIST,
  EDITION_ROUTE_LIST,
  GENRE_ROUTE_LIST,
  TAG_ROUTE_LIST,
  WHITEBORD_ROUTE_LIST,
  PUBLICATION_ROUTE_LIST,
  EXHIBITION_ROUTE_LIST,
  AWARD_ROUTE_LIST,
  CALCULATION_ROUTE_LIST,
  RENTAL_ROUTE_LIST,
  SALE_ROUTE_LIST,
  SALERIGHTSOFUSE_ROUTE_LIST,
  ADDRESS_ROUTE_LIST,
  STATISTIC_ROUTE_LIST,
  ARTWORK_ROUTE_LIST,
  FIRSTSTART_ROUTE_LIST,
  USERS_ROUTE_LIST,
} from "./types/RouteType";
import { App_Context } from "./App_Context";
import {
  DOCTYPE_ADDRESS,
  DOCTYPE_ARTIST,
  DOCTYPE_ARTWORK,
  DOCTYPE_AWARD,
  DOCTYPE_CALCULATION,
  DOCTYPE_CATALOG,
  DOCTYPE_COMPILATION,
  DOCTYPE_EDITION,
  DOCTYPE_EXHIBITION,
  DOCTYPE_FIRSTSTART,
  DOCTYPE_GENRE,
  DOCTYPE_NOTE,
  DOCTYPE_PUBLICATION,
  DOCTYPE_RENTAL,
  DOCTYPE_SALE,
  DOCTYPE_SALE_RIGHTSOFUSE,
  DOCTYPE_STATISTIC,
  DOCTYPE_TAG,
  DOCTYPE_USER,
  DOCTYPE_WHITEBOARD,
  DocType,
} from "../common/types/DocType";
import { ViewType, VIEWTYPE_FORM, VIEWTYPE_LIST } from "./types/ViewType";

type MenuItem = Required<MenuProps>["items"][number];

export interface SideNavigationBar_Props {
  onChange: (route: RouteType) => void;
}

/**
 * Builds the Sidebar for Navigation.
 *
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @version 1.0.0
 *
 * @returns The Sidebar.
 */
export function App_SideNavigationBar({ onChange }: SideNavigationBar_Props) {
  const navigate = useNavigate();

  const triggerChange = (changedValue: RouteType) => {
    // https://www.mediaevent.de/javascript/spread-operator.html
    // mixe das geänderte Objekt zusammen...
    onChange?.(changedValue);
  };

  const handleChange = (
    route: RouteType,
    doctype: DocType,
    viewtype: ViewType
  ) => {
    // Ich gehe hier immer zu einer liste.
    // Sollte sich das mal ändern braucht es hier einen callback
    // damit ich in APP_Routes.tsx den Context neu setzen kann.
    triggerChange(route);
    navigate(route);
  };

  /**
   * Helperfunction, builds a MenuItem.
   *
   * <Menu.Item key="1" onClick={handleMyClick}>
   *  <HeartOutlined /><span> Werke</span>
   * </Menu.Item>
   *
   * @param label The Label (must have)
   * @param key The identifier (must have)
   * @param icon The Icon (optional)
   * @param onClick The onClick Function (optinal)
   * @param children Menue Children (optional)
   * @param type The Type (optional)
   * @returns the MenueItem
   */
  function getMenuItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    onClick?: Function | undefined,
    children?: MenuItem[],
    type?: "group",
    style?: any
  ): MenuItem {
    return {
      key,
      icon,
      onClick,
      children,
      label,
      type,
    } as MenuItem;
  }

  /**
   * This is the Sidebar Menu-Structure.
   * !Add your module here.
   */
  const items: MenuItem[] = [
    getMenuItem("Catalogs", "10", <HomeOutlined />, () =>
      handleChange(CATALOG_ROUTE_LIST, DOCTYPE_CATALOG, VIEWTYPE_LIST)
    ),
    {
      type: "divider",
    },
    getMenuItem("Künstler", "20", <UserOutlined />, () =>
      handleChange(ARTIST_ROUTE_LIST, DOCTYPE_ARTIST, VIEWTYPE_LIST)
    ),

    getMenuItem("Werke", "30", <HeartOutlined />, () =>
      handleChange(ARTWORK_ROUTE_LIST, DOCTYPE_ARTWORK, VIEWTYPE_LIST)
    ),
    getMenuItem("Sammlungen", "sub1", <AppstoreOutlined />, undefined, [
      getMenuItem("Notizen", "40", null, () =>
        handleChange(NOTE_ROUTE_LIST, DOCTYPE_NOTE, VIEWTYPE_LIST)
      ),
      getMenuItem("Werkgruppen", "50", null, () =>
        handleChange(GROUPOFWORK_ROUTE_LIST, DOCTYPE_ARTIST, VIEWTYPE_LIST)
      ),
      getMenuItem("Zusammenstellungen", "60", null, () =>
        handleChange(COMPILATION_ROUTE_LIST, DOCTYPE_COMPILATION, VIEWTYPE_LIST)
      ),
      getMenuItem("Editionen", "70", null, () =>
        handleChange(EDITION_ROUTE_LIST, DOCTYPE_EDITION, VIEWTYPE_LIST)
      ),
      getMenuItem("Genres", "80", null, () =>
        handleChange(GENRE_ROUTE_LIST, DOCTYPE_GENRE, VIEWTYPE_LIST)
      ),
      getMenuItem("Tags", "90", null, () =>
        handleChange(TAG_ROUTE_LIST, DOCTYPE_TAG, VIEWTYPE_LIST)
      ),
    ]),

    getMenuItem("Präsentation", "sub2", <BankOutlined />, undefined, [
      getMenuItem("Whiteboards", "100", null, () =>
        handleChange(WHITEBORD_ROUTE_LIST, DOCTYPE_WHITEBOARD, VIEWTYPE_FORM)
      ),
      getMenuItem("Publikationen", "110", null, () =>
        handleChange(PUBLICATION_ROUTE_LIST, DOCTYPE_PUBLICATION, VIEWTYPE_LIST)
      ),
      getMenuItem("Ausstellungen", "120", null, () =>
        handleChange(EXHIBITION_ROUTE_LIST, DOCTYPE_EXHIBITION, VIEWTYPE_LIST)
      ),
      getMenuItem("Auszeichnungen", "130", null, () =>
        handleChange(AWARD_ROUTE_LIST, DOCTYPE_AWARD, VIEWTYPE_LIST)
      ),
    ]),

    getMenuItem("Büro", "sub3", <CoffeeOutlined />, undefined, [
      getMenuItem("Kalkulationen", "140", null, () =>
        handleChange(CALCULATION_ROUTE_LIST, DOCTYPE_CALCULATION, VIEWTYPE_LIST)
      ),
      getMenuItem("Verleih", "150", null, () =>
        handleChange(RENTAL_ROUTE_LIST, DOCTYPE_RENTAL, VIEWTYPE_LIST)
      ),
      getMenuItem("Verkauf", "160", null, () =>
        handleChange(SALE_ROUTE_LIST, DOCTYPE_SALE, VIEWTYPE_LIST)
      ),
      getMenuItem("Nutzungsrechte", "170", null, () =>
        handleChange(
          SALERIGHTSOFUSE_ROUTE_LIST,
          DOCTYPE_SALE_RIGHTSOFUSE,
          VIEWTYPE_LIST
        )
      ),
      getMenuItem("Kontakte", "180", null, () =>
        handleChange(ADDRESS_ROUTE_LIST, DOCTYPE_ADDRESS, VIEWTYPE_LIST)
      ),
    ]),

    getMenuItem("Administration", "sub4", <CrownOutlined />, undefined, [
      getMenuItem("Benutzer", "200", null, () =>
        handleChange(USERS_ROUTE_LIST, DOCTYPE_USER, VIEWTYPE_LIST)
      ),
      getMenuItem("Statistik", "210", null, () =>
        handleChange(STATISTIC_ROUTE_LIST, DOCTYPE_STATISTIC, VIEWTYPE_LIST)
      ),
      getMenuItem("First Start", "220", null, () =>
        handleChange(FIRSTSTART_ROUTE_LIST, DOCTYPE_FIRSTSTART, VIEWTYPE_LIST)
      ),
    ]),
  ];

  return (
    <div>
      <div
        style={{
          height: "0px",
          background: "rgba(255, 255, 255, 0.2)",
          margin: "16px",
        }}
      />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["10"]}
        defaultOpenKeys={["sub1"]}
        items={items}
      />
    </div>
  );
}
