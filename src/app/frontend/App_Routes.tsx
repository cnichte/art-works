import { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Space, Typography, theme } from "antd";

import { SideNavigationBar } from "./Side_NavigationBar";
import {
  RouteType,
  CATALOG_ROUTE_VIEW,
  CATALOG_ROUTE_LIST,
  CATALOG_ROUTE_FORM,
} from "./types/RouteType";
import { App_Info } from "../common/App_Info";

const { Header, Sider, Content, Footer } = Layout;
const { Title } = Typography;

import { App_Context, ContextData } from "./App_Context";
import { Header_Buttons } from "./Header_Buttons";

import { DocType } from "../common/types/DocType";
import { ViewType } from "./types/ViewType";

import { Catalog_List } from "../modules/catalog/frontend/Catalog_List";
import { Catalog_View } from "../modules/catalog/frontend/Catalog_View";
import { Catalog_Form } from "../modules/catalog/frontend/Catalog_Form";

import { App_Messages } from "./App_Messages";

// Lists, View, Form
import AddressesList from "../modules/address/frontend/addressList";
import AddressView from "../modules/address/frontend/addressView";
import AddressForm from "../modules/address/frontend/addressForm";

import ArtistsList from "../modules/artist/frontend/artistList";
import ArtistView from "../modules/artist/frontend/artistView";
import ArtistForm from "../modules/artist/frontend/artistForm";

import ArtworkList from "../modules/artwork/frontend/artworkList";
import ArtworkView from "../modules/artwork/frontend/artworkView";
import ArtworkForm from "../modules/artwork/frontend/artworkForm";

import AwardList from "../modules/award/frontend/awardList";
import AwardView from "../modules/award/frontend/awardView";
import AwardForm from "../modules/award/frontend/awardForm";

import CalculationList from "../modules/calculation/frontend/calculationList";
import CalculationView from "../modules/calculation/frontend/calculationView";
import CalculationForm from "../modules/calculation/frontend/calculationForm";

import CompilationList from "../modules/compilation/frontend/compilationList";
import CompilationView from "../modules/compilation/frontend/compilationView";
import CompilationForm from "../modules/compilation/frontend/compilationForm";

import EditionList from "../modules/edition/frontend/editionList";
import EditionView from "../modules/edition/frontend/editionView";
import EditionForm from "../modules/edition/frontend/editionForm";

import ExhibitionList from "../modules/exhibition/frontend/exhibitionList";
import ExhibitionView from "../modules/exhibition/frontend/exhibitionView";
import ExhibitionForm from "../modules/exhibition/frontend/exhibitionForm";

import FirstStartSteps from "../modules/firtststart/frontend/firstStartSteps";

import GenresList from "../modules/genre/frontend/genreList";
import GenresView from "../modules/genre/frontend/genreView";
import GenreForm from "../modules/genre/frontend/genreForm";

import GroupOfWorkList from "../modules/groupofwork/frontend/groupOfWorkList";
import GroupOfWorkView from "../modules/groupofwork/frontend/groupOfWorkView";
import GroupOfWorkForm from "../modules/groupofwork/frontend/groupOfWorkForm";

import NoteList from "../modules/note/frontend/noteList";
import NoteView from "../modules/note/frontend/noteView";
import NoteForm from "../modules/note/frontend/noteForm";

import PublicationsList from "../modules/publication/frontend/publicationList";
import PublicationsView from "../modules/publication/frontend/publicationView";
import PublicationForm from "../modules/publication/frontend/publicationForm";

import RentalList from "../modules/rental/frontend/rentalList";
import RentalView from "../modules/rental/frontend/rentalView";
import RentalForm from "../modules/rental/frontend/rentalForm";

import SaleList from "../modules/sale/frontend/saleList";
import SaleView from "../modules/sale/frontend/saleView";
import SaleForm from "../modules/sale/frontend/saleForm";

import SaleRightsOfUseList from "../modules/salerightsofuse/frontend/saleRightsOfUseList";
import SaleRightsOfUseView from "../modules/salerightsofuse/frontend/saleRightsOfUseView";
import SaleRightsOfUseForm from "../modules/salerightsofuse/frontend/saleRightsOfUseForm";

import StatisticView from "../modules/statistic/frontend/statisticView";

import TagList from "../modules/tag/frontend/tagList";
import TagView from "../modules/tag/frontend/tagView";
import TagForm from "../modules/tag/frontend/tagForm";

import WhiteboardList from "../modules/whiteboard/frontend/whiteboardList";
import WhiteboardView from "../modules/whiteboard/frontend/whiteboardView";
import WhiteboardForm from "../modules/whiteboard/frontend/whiteboardForm";

export function App_Routes() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [viewtype, setViewtype] = useState<ViewType>();
  const [doctype, setDoctype] = useState<DocType>();
  // is set in App_SideNavigationBar
  const value: ContextData = {
    viewtype,
    setViewtype,
    doctype,
    setDoctype,
  };

  return (
    <App_Context.Provider value={value}>
      <App_Messages />
      <Router>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{ height: "100vh" }}
          >
            <div className="demo-logo-vertical" />
            <SideNavigationBar
              onChange={function (value: RouteType): void {
                console.log("App_Routes.tsx says: Route has changed", value);
              }}
            />
          </Sider>
          <Layout>
            <Header
              style={{
                padding: 0,
                // position: "sticky",
                // background: colorBgContainer,
                top: 0,
                zIndex: 1,
                width: "100%",
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

                <Route path="/address/list" Component={AddressesList} />
                <Route path="/address/view/:id" Component={AddressView} />
                <Route path="/address/form/:id" Component={AddressForm} />

                <Route path="/artist/list" Component={ArtistsList} />
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

                <Route path="/genre/list" Component={GenresList} />
                <Route path="/genre/view/:id" Component={GenresView} />
                <Route path="/genre/form/:id" Component={GenreForm} />

                <Route path="/groupofwork/list" Component={GroupOfWorkList} />
                <Route path="/groupofwork/view/:id" Component={GroupOfWorkView} />
                <Route path="/groupofwork/form/:id" Component={GroupOfWorkForm} />

                <Route path="/note/list" Component={NoteList} />
                <Route path="/note/view/:id" Component={NoteView} />
                <Route path="/note/form/:id" Component={NoteForm} />

                <Route path="/publication/list" Component={PublicationsList} />
                <Route path="/publication/view/:id" Component={PublicationsView} />
                <Route path="/publication/form/:id" Component={PublicationForm} />

                <Route path="/rental/list" Component={RentalList} />
                <Route path="/rental/view/:id" Component={RentalView} />
                <Route path="/rental/form/:id" Component={RentalForm} />

                <Route path="/sale/list" Component={SaleList} />
                <Route path="/sale/view/:id" Component={SaleView} />
                <Route path="/sale/form/:id" Component={SaleForm} />

                <Route path="/salerightsofuse/list" Component={SaleRightsOfUseList} />
                <Route path="/salerightsofuse/view/:id" Component={SaleRightsOfUseView} />
                <Route path="/salerightsofuse/form/:id" Component={SaleRightsOfUseForm} />

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
    </App_Context.Provider>
  );
}