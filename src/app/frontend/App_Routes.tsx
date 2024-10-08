import { ReactElement, useEffect, useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Space, theme } from "antd";

import { App_SideNavigationBar } from "./App_SideNavigationBar";
import {
  RouteType,
  CATALOG_ROUTE_VIEW,
  CATALOG_ROUTE_LIST,
  CATALOG_ROUTE_FORM,
  USERS_ROUTE_LIST,
  USERS_ROUTE_VIEW,
  USERS_ROUTE_FORM,
} from "./types/RouteType";
import { App_Info } from "../common/App_Info";

const { Header, Sider, Content, Footer } = Layout;

import { App_Context, ContextData } from "./App_Context";


import { DocType } from "../common/types/DocType";
import { ViewType } from "./types/ViewType";

import {
  Catalog_List,
  Catalog_View,
  Catalog_Form,
} from "../modules/framework/catalog/frontend/";

// Lists, View, Form
import {
  AddressList,
  AddressView,
  AddressForm,
} from "../modules/custom/address/frontend";
import { ArtistList, ArtistView, ArtistForm } from "../modules/custom/artist/frontend";
import {
  ArtworkList,
  ArtworkView,
  ArtworkForm,
} from "../modules/custom/artwork/frontend";
import { AwardList, AwardView, AwardForm } from "../modules/custom/award/frontend";
import {
  CalculationList,
  CalculationView,
  CalculationForm,
} from "../modules/custom/calculation/frontend";
import {
  CompilationList,
  CompilationView,
  CompilationForm,
} from "../modules/custom/compilation/frontend";
import {
  EditionList,
  EditionView,
  EditionForm,
} from "../modules/custom/edition/frontend";
import {
  ExhibitionList,
  ExhibitionView,
  ExhibitionForm,
} from "../modules/custom/exhibition/frontend";

import { FirstStartSteps } from "../modules/custom/firtststart/frontend";

import { GenreList, GenreView, GenreForm } from "../modules/custom/genre/frontend";
import {
  GroupOfWorkList,
  GroupOfWorkView,
  GroupOfWorkForm,
} from "../modules/custom/groupofwork/frontend";
import { NoteList, NoteView, NoteForm } from "../modules/custom/note/frontend";
import {
  PublicationList,
  PublicationView,
  PublicationForm,
} from "../modules/custom/publication/frontend";
import { RentalList, RentalView, RentalForm } from "../modules/custom/rental/frontend";
import { SaleList, SaleView, SaleForm } from "../modules/custom/sale/frontend";
import {
  SaleRightsOfUseList,
  SaleRightsOfUseView,
  SaleRightsOfUseForm,
} from "../modules/custom/salerightsofuse/frontend";

import { StatisticView } from "../modules/custom/statistic/frontend";

import { TagList, TagView, TagForm } from "../modules/custom/tag/frontend";
import {
  WhiteboardList,
  WhiteboardView,
  WhiteboardForm,
} from "../modules/custom/whiteboard/frontend";
import { User_Form, User_List, User_View } from "../modules/framework/user/frontend";
import { DocUser } from "../common/framework/types/documents/DocUser";
import { Settings_Request } from "../common/framework/types/system/RequestTypes";
import { App_User_LoginForm } from "./App_User_LoginForm";
import { Header_Buttons } from "./custom/components/Header_Buttons";
import { App_Messages } from "./custom/components/App_Messages";

/**
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @version 1.0.0
 */
export function App_Routes() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [viewtype, setViewtype] = useState<ViewType>();
  const [doctype, setDoctype] = useState<DocType>();
  // is set in App_SideNavigationBar
  // TODO Make login more robust
  // https://www.youtube.com/watch?v=Fqg1yFogiDo
  const [currentUser, setCurrentUser] = useState<DocUser>();
  const value: ContextData = {
    currentUser: currentUser,
    setCurrentUser: setCurrentUser,
  };

  useEffect(() => {
    const request: Settings_Request = {
      request_type: "request:get-current-user",
      request_options: [],
    };

    window.electronAPI
      .invoke_request("ipc-settings", [request])
      .then((result: DocUser) => {
        setCurrentUser(result);
      })
      .catch(function (error: any) {});
  }, []);

  // Arrow/lambda function expression
  const get_login_form = (): ReactElement => (
    <App_User_LoginForm
      title={""}
      onOk={function (user: DocUser): void {
        setCurrentUser(user);
      }}
    />
  );

  const get_content = (): ReactElement => (
    <Router>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ height: "100vh", position: "sticky", top: 0 }}
        >
          <div className="demo-logo-vertical" />
          <App_SideNavigationBar
            onChange={function (value: RouteType): void {
              console.log("App_Routes.tsx says: Route has changed", value);
            }}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              position: "sticky",
              // background: colorBgContainer,
              top: 0,
              zIndex: 1,
              width: "100vw",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
                color: colorBgContainer,
              }}
            />
            <Space>
              <Header_Buttons />
            </Space>
          </Header>
          <Content
            style={{
              margin: "14px 16px",
              padding: 14,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/" Component={Catalog_List} />
              <Route path={CATALOG_ROUTE_LIST} Component={Catalog_List} />
              <Route path={CATALOG_ROUTE_VIEW} Component={Catalog_View} />
              <Route path={CATALOG_ROUTE_FORM} Component={Catalog_Form} />

              <Route path={USERS_ROUTE_LIST} Component={User_List} />
              <Route path={USERS_ROUTE_VIEW} Component={User_View} />
              <Route path={USERS_ROUTE_FORM} Component={User_Form} />

              <Route path="/address/list" Component={AddressList} />
              <Route path="/address/view/:id" Component={AddressView} />
              <Route path="/address/form/:id" Component={AddressForm} />

              <Route path="/artist/list" Component={ArtistList} />
              <Route path="/artist/view/:id" Component={ArtistView} />
              <Route path="/artist/form/:id" Component={ArtistForm} />

              <Route path="/artwork/list" Component={ArtworkList} />
              <Route path="/artwork/view/:id" Component={ArtworkView} />
              <Route path="/artwork/form/:id" Component={ArtworkForm} />

              <Route path="/award/list" Component={AwardList} />
              <Route path="/award/view/:id" Component={AwardView} />
              <Route path="/award/form/:id" Component={AwardForm} />

              <Route path="/calculation/list" Component={CalculationList} />
              <Route path="/calculation/view/:id" Component={CalculationView} />
              <Route path="/calculation/form/:id" Component={CalculationForm} />

              <Route path="/compilation/list" Component={CompilationList} />
              <Route path="/compilation/view/:id" Component={CompilationView} />
              <Route path="/compilation/form/:id" Component={CompilationForm} />

              <Route path="/edition/list" Component={EditionList} />
              <Route path="/edition/view/:id" Component={EditionView} />
              <Route path="/edition/form/:id" Component={EditionForm} />

              <Route path="/exhibition/list" Component={ExhibitionList} />
              <Route path="/exhibition/view/:id" Component={ExhibitionView} />
              <Route path="/exhibition/form/:id" Component={ExhibitionForm} />

              <Route path="/firststart/list" Component={FirstStartSteps} />

              <Route path="/genre/list" Component={GenreList} />
              <Route path="/genre/view/:id" Component={GenreView} />
              <Route path="/genre/form/:id" Component={GenreForm} />

              <Route path="/groupofwork/list" Component={GroupOfWorkList} />
              <Route path="/groupofwork/view/:id" Component={GroupOfWorkView} />
              <Route path="/groupofwork/form/:id" Component={GroupOfWorkForm} />

              <Route path="/note/list" Component={NoteList} />
              <Route path="/note/view/:id" Component={NoteView} />
              <Route path="/note/form/:id" Component={NoteForm} />

              <Route path="/publication/list" Component={PublicationList} />
              <Route path="/publication/view/:id" Component={PublicationView} />
              <Route path="/publication/form/:id" Component={PublicationForm} />

              <Route path="/rental/list" Component={RentalList} />
              <Route path="/rental/view/:id" Component={RentalView} />
              <Route path="/rental/form/:id" Component={RentalForm} />

              <Route path="/sale/list" Component={SaleList} />
              <Route path="/sale/view/:id" Component={SaleView} />
              <Route path="/sale/form/:id" Component={SaleForm} />

              <Route
                path="/salerightsofuse/list"
                Component={SaleRightsOfUseList}
              />
              <Route
                path="/salerightsofuse/view/:id"
                Component={SaleRightsOfUseView}
              />
              <Route
                path="/salerightsofuse/form/:id"
                Component={SaleRightsOfUseForm}
              />

              <Route path="/statistic/list" Component={StatisticView} />

              <Route path="/tag/list" Component={TagList} />
              <Route path="/tag/view/:id" Component={TagView} />
              <Route path="/tag/form/:id" Component={TagForm} />

              <Route path="/whiteboard/list" Component={WhiteboardList} />
              <Route path="/whiteboard/view/:id" Component={WhiteboardView} />
              <Route path="/whiteboard/form/:id" Component={WhiteboardForm} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            {App_Info.MY_APP_NAME} - {App_Info.MY_APP_VERSION} ©
            {new Date().getFullYear()} Created by Carsten Nichte
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );

  return (
    <App_Context.Provider value={value}>
      <App_Messages />
      {currentUser == null ? get_login_form() : get_content()}
    </App_Context.Provider>
  );
}
