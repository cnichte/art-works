import { DocumentCreator } from "./DocumentCreator";
import { Address } from "../common/types/DocAddress";
import { AddressType } from "../common/types/DocAddressType";
import { Artist } from "../common/types/DocArtist";
import { Artwork } from "../common/types/DocArtwork";
import { Award } from "../common/types/DocAward";
import {
  Calculation,
  CalculationGroup,
  CalculationItem,
} from "../common/types/DocCalculation";
import { Compilation } from "../common/types/DocCompilation";
import { Exhibition, ExhibitionType } from "../common/types/DocExhibition";
import { Genre } from "../common/types/DocGenre";
import { GroupOfWork } from "../common/types/DocGroupOfWork";
import { Note } from "../common/types/DocNote";
import {
  Publication,
  PublicationMedium,
  PublicationType,
  PublicationWhat,
} from "../common/types/DocPublication";
import { Rental } from "../common/types/DocRental";
import { Resume, ResumeType } from "../common/types/DocResume";
import {
  SaleRightsOfUse,
  SaleRightsOfUseType,
} from "../common/types/DocSaleRightsOfUse";
import { Sale, SaleType } from "../common/types/DocSale";
import { Tag } from "../common/types/DocTag";
import { DocWhiteboard } from "../common/types/DocWhiteboard";
import { Edition, EditionType } from "../common/types/DocEdition";
import { DocUser } from "../common/types/DocUser";

export function db_initialize(db:any) {
  DocumentCreator.loadTo<DocUser>(db, "./docs-json/user.json", DocUser);

  DocumentCreator.loadTo<Address>(db, "./docs-json/address.json", Address);
  DocumentCreator.loadTo<AddressType>(db,"./docs-json/address-type.json",AddressType);
  DocumentCreator.loadTo<Artist>(db, "./docs-json/artist.json", Artist);
  DocumentCreator.loadTo<Artwork>(db, "./docs-json/artwork.json", Artwork);
  DocumentCreator.loadTo<Award>(db, "./docs-json/award.json", Award);
  DocumentCreator.loadTo<CalculationGroup>(db, "./docs-json/calculation-group.json", CalculationGroup);
  DocumentCreator.loadTo<CalculationItem>(db,"./docs-json/calculation-item.json",CalculationItem);
  DocumentCreator.loadTo<Calculation>(db,"./docs-json/calculation-item.json",Calculation);
  DocumentCreator.loadTo<Compilation>(db,"./docs-json/compilation.json",Compilation);
  DocumentCreator.loadTo<Edition>(db, "./docs-json/edition.json", Edition);
  DocumentCreator.loadTo<ExhibitionType>(db,"./docs-json/exhibition-type.json",ExhibitionType);
  DocumentCreator.loadTo<EditionType>(db,"./docs-json/edition-type.json",EditionType);
  DocumentCreator.loadTo<Exhibition>(db,"./docs-json/exhibition.json",Exhibition);
  DocumentCreator.loadTo<Genre>(db, "./docs-json/genre.json", Genre);
  DocumentCreator.loadTo<GroupOfWork>(db,"./docs-json/group-of-work.json",GroupOfWork);
  DocumentCreator.loadTo<Note>(db, "./docs-json/note.json", Note);
  DocumentCreator.loadTo<PublicationMedium>(db,"./docs-json/publication-medium.json",PublicationMedium);
  DocumentCreator.loadTo<PublicationType>(db,"./docs-json/publication-type.json",PublicationType);
  DocumentCreator.loadTo<PublicationWhat>(db,"./docs-json/publication-what.json",PublicationWhat);
  DocumentCreator.loadTo<Publication>(db,"./docs-json/publication.json",Publication);
  DocumentCreator.loadTo<Rental>(db, "./docs-json/rental.json", Rental);
  DocumentCreator.loadTo<ResumeType>(db,"./docs-json/resume-type.json",ResumeType);
  DocumentCreator.loadTo<Resume>(db, "./docs-json/resume.json", Resume);
  DocumentCreator.loadTo<SaleRightsOfUseType>(db,"./docs-json/sale-rights-of-use-type.json",SaleRightsOfUseType);
  DocumentCreator.loadTo<SaleRightsOfUse>(db,"./docs-json/sale-rights-of-use.json",SaleRightsOfUse);
  DocumentCreator.loadTo<SaleType>(db,"./docs-json/sale-type.json",SaleType);
  DocumentCreator.loadTo<Sale>(db, "./docs-json/sale.json", Sale);
  DocumentCreator.loadTo<Tag>(db, "./docs-json/tag.json", Tag);
  DocumentCreator.loadTo<DocWhiteboard>(db,"./docs-json/whiteboards.json",DocWhiteboard);
}
