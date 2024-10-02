import { DocumentCreator } from "../../../framework/tools/DocumentCreator";
import { Address } from "../../../../common/custom/types/documents/DocAddress";
import { AddressType } from "../../../../common/custom/types/documents/DocAddressType";
import { Artist } from "../../../../common/custom/types/documents/DocArtist";
import { Artwork } from "../../../../common/custom/types/documents/DocArtwork";
import { Award } from "../../../../common/custom/types/documents/DocAward";
import {
  Calculation,
  CalculationGroup,
  CalculationItem,
} from "../../../../common/custom/types/documents/DocCalculation";
import { Compilation } from "../../../../common/custom/types/documents/DocCompilation";
import { Exhibition, ExhibitionType } from "../../../../common/custom/types/documents/DocExhibition";
import { Genre } from "../../../../common/custom/types/documents/DocGenre";
import { GroupOfWork } from "../../../../common/custom/types/documents/DocGroupOfWork";
import { Note } from "../../../../common/custom/types/documents/DocNote";
import {
  Publication,
  PublicationMedium,
  PublicationType,
  PublicationWhat,
} from "../../../../common/custom/types/documents/DocPublication";
import { Rental } from "../../../../common/custom/types/documents/DocRental";
import { Resume, ResumeType } from "../../../../common/custom/types/documents/DocResume";
import {
  SaleRightsOfUse,
  SaleRightsOfUseType,
} from "../../../../common/custom/types/documents/DocSaleRightsOfUse";
import { Sale, SaleType } from "../../../../common/custom/types/documents/DocSale";
import { Tag } from "../../../../common/custom/types/documents/DocTag";
import { DocWhiteboard } from "../../../../common/custom/types/documents/DocWhiteboard";
import { Edition, EditionType } from "../../../../common/custom/types/documents/DocEdition";
import { DocUser } from "../../../../common/framework/types/documents/DocUser";
import { DatabaseCRUD_Interface } from "../../../framework/types/Database_Types";

export function db_initialize(db:DatabaseCRUD_Interface) {

  DocumentCreator.loadTo<DocUser>(db, "./docs-json/user.json", DocUser, []);

  DocumentCreator.loadTo<Address>(db, "./docs-json/address.json", Address, ["use_relation"]);
  DocumentCreator.loadTo<AddressType>(db,"./docs-json/address-type.json",AddressType, ["use_relation"]);
  DocumentCreator.loadTo<Artist>(db, "./docs-json/artist.json", Artist, ["use_relation"]);
  DocumentCreator.loadTo<Artwork>(db, "./docs-json/artwork.json", Artwork, ["use_relation"]);
  DocumentCreator.loadTo<Award>(db, "./docs-json/award.json", Award, ["use_relation"]);
  DocumentCreator.loadTo<CalculationGroup>(db, "./docs-json/calculation-group.json", CalculationGroup, ["use_relation"]);
  DocumentCreator.loadTo<CalculationItem>(db,"./docs-json/calculation-item.json",CalculationItem, ["use_relation"]);
  DocumentCreator.loadTo<Calculation>(db,"./docs-json/calculation-item.json",Calculation, ["use_relation"]);
  DocumentCreator.loadTo<Compilation>(db,"./docs-json/compilation.json",Compilation, ["use_relation"]);
  DocumentCreator.loadTo<Edition>(db, "./docs-json/edition.json", Edition, ["use_relation"]);
  DocumentCreator.loadTo<ExhibitionType>(db,"./docs-json/exhibition-type.json",ExhibitionType, ["use_relation"]);
  DocumentCreator.loadTo<EditionType>(db,"./docs-json/edition-type.json",EditionType, ["use_relation"]);
  DocumentCreator.loadTo<Exhibition>(db,"./docs-json/exhibition.json",Exhibition, ["use_relation"]);
  DocumentCreator.loadTo<Genre>(db, "./docs-json/genre.json", Genre, ["use_relation"]);
  DocumentCreator.loadTo<GroupOfWork>(db,"./docs-json/group-of-work.json",GroupOfWork, ["use_relation"]);
  DocumentCreator.loadTo<Note>(db, "./docs-json/note.json", Note, ["use_relation"]);
  DocumentCreator.loadTo<PublicationMedium>(db,"./docs-json/publication-medium.json",PublicationMedium, ["use_relation"]);
  DocumentCreator.loadTo<PublicationType>(db,"./docs-json/publication-type.json",PublicationType, ["use_relation"]);
  DocumentCreator.loadTo<PublicationWhat>(db,"./docs-json/publication-what.json",PublicationWhat, ["use_relation"]);
  DocumentCreator.loadTo<Publication>(db,"./docs-json/publication.json",Publication, ["use_relation"]);
  DocumentCreator.loadTo<Rental>(db, "./docs-json/rental.json", Rental, ["use_relation"]);
  DocumentCreator.loadTo<ResumeType>(db,"./docs-json/resume-type.json",ResumeType, ["use_relation"]);
  DocumentCreator.loadTo<Resume>(db, "./docs-json/resume.json", Resume, ["use_relation"]);
  DocumentCreator.loadTo<SaleRightsOfUseType>(db,"./docs-json/sale-rights-of-use-type.json",SaleRightsOfUseType, ["use_relation"]);
  DocumentCreator.loadTo<SaleRightsOfUse>(db,"./docs-json/sale-rights-of-use.json",SaleRightsOfUse, ["use_relation"]);
  DocumentCreator.loadTo<SaleType>(db,"./docs-json/sale-type.json",SaleType, ["use_relation"]);
  DocumentCreator.loadTo<Sale>(db, "./docs-json/sale.json", Sale, ["use_relation"]);
  DocumentCreator.loadTo<Tag>(db, "./docs-json/tag.json", Tag, ["use_relation"]);
  DocumentCreator.loadTo<DocWhiteboard>(db,"./docs-json/whiteboards.json",DocWhiteboard, ["use_relation"]);
}
