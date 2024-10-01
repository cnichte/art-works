import { DocumentCreator } from "../../tools/DocumentCreator";
import { Address } from "../../../common/types/documents/DocAddress";
import { AddressType } from "../../../common/types/documents/DocAddressType";
import { Artist } from "../../../common/types/documents/DocArtist";
import { Artwork } from "../../../common/types/documents/DocArtwork";
import { Award } from "../../../common/types/documents/DocAward";
import {
  Calculation,
  CalculationGroup,
  CalculationItem,
} from "../../../common/types/documents/DocCalculation";
import { Compilation } from "../../../common/types/documents/DocCompilation";
import { Exhibition, ExhibitionType } from "../../../common/types/documents/DocExhibition";
import { Genre } from "../../../common/types/documents/DocGenre";
import { GroupOfWork } from "../../../common/types/documents/DocGroupOfWork";
import { Note } from "../../../common/types/documents/DocNote";
import {
  Publication,
  PublicationMedium,
  PublicationType,
  PublicationWhat,
} from "../../../common/types/documents/DocPublication";
import { Rental } from "../../../common/types/documents/DocRental";
import { Resume, ResumeType } from "../../../common/types/documents/DocResume";
import {
  SaleRightsOfUse,
  SaleRightsOfUseType,
} from "../../../common/types/documents/DocSaleRightsOfUse";
import { Sale, SaleType } from "../../../common/types/documents/DocSale";
import { Tag } from "../../../common/types/documents/DocTag";
import { DocWhiteboard } from "../../../common/types/documents/DocWhiteboard";
import { Edition, EditionType } from "../../../common/types/documents/DocEdition";
import { DocUser } from "../../../common/types/documents/DocUser";
import { DatabaseCRUD_Interface } from "../../types/Database_Types";

export function db_initialize(db:DatabaseCRUD_Interface) {
  DocumentCreator.loadTo<DocUser>(db, "./docs-json/user.json", DocUser, false);

  DocumentCreator.loadTo<Address>(db, "./docs-json/address.json", Address, true);
  DocumentCreator.loadTo<AddressType>(db,"./docs-json/address-type.json",AddressType, true);
  DocumentCreator.loadTo<Artist>(db, "./docs-json/artist.json", Artist, true);
  DocumentCreator.loadTo<Artwork>(db, "./docs-json/artwork.json", Artwork, true);
  DocumentCreator.loadTo<Award>(db, "./docs-json/award.json", Award, true);
  DocumentCreator.loadTo<CalculationGroup>(db, "./docs-json/calculation-group.json", CalculationGroup, true);
  DocumentCreator.loadTo<CalculationItem>(db,"./docs-json/calculation-item.json",CalculationItem, true);
  DocumentCreator.loadTo<Calculation>(db,"./docs-json/calculation-item.json",Calculation, true);
  DocumentCreator.loadTo<Compilation>(db,"./docs-json/compilation.json",Compilation, true);
  DocumentCreator.loadTo<Edition>(db, "./docs-json/edition.json", Edition, true);
  DocumentCreator.loadTo<ExhibitionType>(db,"./docs-json/exhibition-type.json",ExhibitionType, true);
  DocumentCreator.loadTo<EditionType>(db,"./docs-json/edition-type.json",EditionType, true);
  DocumentCreator.loadTo<Exhibition>(db,"./docs-json/exhibition.json",Exhibition, true);
  DocumentCreator.loadTo<Genre>(db, "./docs-json/genre.json", Genre, true);
  DocumentCreator.loadTo<GroupOfWork>(db,"./docs-json/group-of-work.json",GroupOfWork, true);
  DocumentCreator.loadTo<Note>(db, "./docs-json/note.json", Note, true);
  DocumentCreator.loadTo<PublicationMedium>(db,"./docs-json/publication-medium.json",PublicationMedium, true);
  DocumentCreator.loadTo<PublicationType>(db,"./docs-json/publication-type.json",PublicationType, true);
  DocumentCreator.loadTo<PublicationWhat>(db,"./docs-json/publication-what.json",PublicationWhat, true);
  DocumentCreator.loadTo<Publication>(db,"./docs-json/publication.json",Publication, true);
  DocumentCreator.loadTo<Rental>(db, "./docs-json/rental.json", Rental, true);
  DocumentCreator.loadTo<ResumeType>(db,"./docs-json/resume-type.json",ResumeType, true);
  DocumentCreator.loadTo<Resume>(db, "./docs-json/resume.json", Resume, true);
  DocumentCreator.loadTo<SaleRightsOfUseType>(db,"./docs-json/sale-rights-of-use-type.json",SaleRightsOfUseType, true);
  DocumentCreator.loadTo<SaleRightsOfUse>(db,"./docs-json/sale-rights-of-use.json",SaleRightsOfUse, true);
  DocumentCreator.loadTo<SaleType>(db,"./docs-json/sale-type.json",SaleType, true);
  DocumentCreator.loadTo<Sale>(db, "./docs-json/sale.json", Sale, true);
  DocumentCreator.loadTo<Tag>(db, "./docs-json/tag.json", Tag, true);
  DocumentCreator.loadTo<DocWhiteboard>(db,"./docs-json/whiteboards.json",DocWhiteboard, true);
}
