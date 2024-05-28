/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout, Typography } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import CSS from 'csstype';

import SideNavigationBar from './mySideNavigationBar';

import FirstStartSteps from '../modules/firtststart/frontend/firstStartSteps';

import CatalogsList from '../modules/catalogs/frontend/catalogsList';
import CatalogsView from '../modules/catalogs/frontend/catalogsView';
import CatalogsForm from '../modules/catalogs/frontend/catalogsForm';

// Lists, View, Form
import AddressesList from '../modules/address/frontend/addressList';
import AddressView from '../modules/address/frontend/addressView';
import AddressForm from '../modules/address/frontend/addressForm';

import ArtistsList from '../modules/artist/frontend/artistList';
import ArtistView from '../modules/artist/frontend/artistView';
import ArtistForm from '../modules/artist/frontend/artistForm';

import ArtworkList from '../modules/artwork/frontend/artworkList';
import ArtworkView from '../modules/artwork/frontend/artworkView';
import ArtworkForm from '../modules/artwork/frontend/artworkForm';

import AwardList from '../modules/award/frontend/awardList';
import AwardView from '../modules/award/frontend/awardView';
import AwardForm from '../modules/award/frontend/awardForm';

import CalculationList from '../modules/calculation/frontend/calculationList';
import CalculationView from '../modules/calculation/frontend/calculationView';
import CalculationForm from '../modules/calculation/frontend/calculationForm';

import CompilationList from '../modules/compilation/frontend/compilationList';
import CompilationView from '../modules/compilation/frontend/compilationView';
import CompilationForm from '../modules/compilation/frontend/compilationForm';

import EditionList from '../modules/edition/frontend/editionList';
import EditionView from '../modules/edition/frontend/editionView';
import EditionForm from '../modules/edition/frontend/editionForm';

import ExhibitionList from '../modules/exhibition/frontend/exhibitionList';
import ExhibitionView from '../modules/exhibition/frontend/exhibitionView';
import ExhibitionForm from '../modules/exhibition/frontend/exhibitionForm';

import ExportForm from '../modules/catalogs/frontend/exportForm';

import GenresList from '../modules/genre/frontend/genreList';
import GenresView from '../modules/genre/frontend/genreView';
import GenreForm from '../modules/genre/frontend/genreForm';

import GroupOfWorkList from '../modules/groupofwork/frontend/groupOfWorkList';
import GroupOfWorkView from '../modules/groupofwork/frontend/groupOfWorkView';
import GroupOfWorkForm from '../modules/groupofwork/frontend/groupOfWorkForm';

import NoteList from '../modules/note/frontend/noteList';
import NoteView from '../modules/note/frontend/noteView';
import NoteForm from '../modules/note/frontend/noteForm';

import PublicationsList from '../modules/publication/frontend/publicationList';
import PublicationsView from '../modules/publication/frontend/publicationView';
import PublicationForm from '../modules/publication/frontend/publicationForm';

import RentalList from '../modules/rental/frontend/rentalList';
import RentalView from '../modules/rental/frontend/rentalView';
import RentalForm from '../modules/rental/frontend/rentalForm';

import SaleList from '../modules/sale/frontend/saleList';
import SaleView from '../modules/sale/frontend/saleView';
import SaleForm from '../modules/sale/frontend/saleForm';

import SaleRightsOfUseList from '../modules/salerightsofuse/frontend/saleRightsOfUseList';
import SaleRightsOfUseView from '../modules/salerightsofuse/frontend/saleRightsOfUseView';
import SaleRightsOfUseForm from '../modules/salerightsofuse/frontend/saleRightsOfUseForm';

import StatisticView from '../modules/statistic/frontend/statisticView';

import TagList from '../modules/tag/frontend/tagList';
import TagView from '../modules/tag/frontend/tagView';
import TagForm from '../modules/tag/frontend/tagForm';

import WhiteboardList from '../modules/whiteboard/frontend/whiteboardList';
import WhiteboardView from '../modules/whiteboard/frontend/whiteboardView';
import WhiteboardForm from '../modules/whiteboard/frontend/whiteboardForm';

// Parts/Components
// import { MyBreadCrumbs } from './parts/mybreadcrumbs'; //* Benutze: <MyBreadCrumbs />

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

/**
 * Das Hauptprogramm des Frontends
 * besteht hauptsächlich aus einem Router,
 * der auf alle Teile der Benutzerberläche verweist,
 * und dem grundsätzlichen Layout-Gerüst (Header, Sider, Content, Footer).
 *
 * Wird in der Electron-Boilerplate in /src/renderer/App.tsx aufgerufen.
 *
 *
// TODO Das sollte sich automatisch aus den Modulen aufbauen.
 *
 * @returns Router
 */
function ApplicationRoutes() {
  const [collapse, setCollapse] = useState(false);

  // Javascript Arrow function expressions
  useEffect(() => {
    return window.innerWidth <= 760 ? setCollapse(true) : setCollapse(false);
  }, []);

  const handleToggle = (event: any) => {
    event.preventDefault();
    return collapse ? setCollapse(false) : setCollapse(true);
  };

  const leftStyle: CSS.Properties = {
    width: '30px',
    margin: '0px',
    float: 'left',
  };
  const rightStyle: CSS.Properties = {
    fontFamily: 'Helvetica',
    fontSize: '16px',
    color: '#a2a7ab',
  };

  return (
    <Router>
      <Layout hasSider>
        <Sider trigger={null} collapsible collapsed={collapse}>
          <SideNavigationBar />
        </Sider>
        <Layout>
          <Header
            className="siteLayoutBackground"
            style={{ padding: 0, background: '#001529' }}
          >
            <div>
              <div style={leftStyle}>
                {React.createElement(
                  collapse ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: 'trigger',
                    onClick: handleToggle,
                    style: { color: '#fff' },
                  }
                )}
              </div>
              <div style={rightStyle}>Werkverzeichnis Carsten Nichte</div>
            </div>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 'calc(100vh - 114px)',
              background: '#fff',
            }}
          >
            <Routes>
              <Route path="/firststart" Component={FirstStartSteps} />

              <Route path="/catalogs/list" Component={CatalogsList} />
              <Route path="/catalogs/view/:id" Component={CatalogsView} />
              <Route path="/catalogs/form/:id" Component={CatalogsForm} />

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

              <Route path="/compilation/list" Component={CompilationList} />
              <Route path="/compilation/view/:id" Component={CompilationView} />
              <Route path="/compilation/form/:id" Component={CompilationForm} />

              <Route path="/edition/list" Component={EditionList} />
              <Route path="/edition/view/:id" Component={EditionView} />
              <Route path="/edition/form/:id" Component={EditionForm} />

              <Route path="/exhibition/list" Component={ExhibitionList} />
              <Route path="/exhibition/view/:id" Component={ExhibitionView} />
              <Route path="/exhibition/form/:id" Component={ExhibitionForm} />

              <Route path="/export/form" Component={ExportForm} />

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
              <Route
                path="/publication/view/:id"
                Component={PublicationsView}
              />
              <Route path="/publication/form/:id" Component={PublicationForm} />

              <Route path="/rental/list" Component={RentalList} />
              <Route path="/rental/view/:id" Component={RentalView} />
              <Route path="/rental/form/:id" Component={RentalForm} />

              <Route path="/calculation/list" Component={CalculationList} />
              <Route path="/calculation/view/:id" Component={CalculationView} />
              <Route path="/calculation/form/:id" Component={CalculationForm} />

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

              <Route path="/statistic/view" Component={StatisticView} />

              <Route path="/tag/list" Component={TagList} />
              <Route path="/tag/view/:id" Component={TagView} />
              <Route path="/tag/form/:id" Component={TagForm} />

              <Route path="/whiteboard/list" Component={WhiteboardList} />
              <Route path="/whiteboard/view/:id" Component={WhiteboardView} />
              <Route path="/whiteboard/form/:id" Component={WhiteboardForm} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default ApplicationRoutes;
