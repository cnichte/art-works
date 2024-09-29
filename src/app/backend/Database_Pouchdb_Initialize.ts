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

export function db_initialize() {
  DocumentCreator.loadTo<DocUser>(this, "./docs-json/user.json", DocUser);

  DocumentCreator.loadTo<Address>(this, "./docs-json/address.json", Address);
  DocumentCreator.loadTo<AddressType>(this,"./docs-json/address-type.json",AddressType);
  DocumentCreator.loadTo<Artist>(this, "./docs-json/artist.json", Artist);
  DocumentCreator.loadTo<Artwork>(this, "./docs-json/artwork.json", Artwork);
  DocumentCreator.loadTo<Award>(this, "./docs-json/award.json", Award);
  DocumentCreator.loadTo<CalculationGroup>(this, "./docs-json/calculation-group.json", CalculationGroup);
  DocumentCreator.loadTo<CalculationItem>(this,"./docs-json/calculation-item.json",CalculationItem);
  DocumentCreator.loadTo<Calculation>(this,"./docs-json/calculation-item.json",Calculation);
  DocumentCreator.loadTo<Compilation>(this,"./docs-json/compilation.json",Compilation);
  DocumentCreator.loadTo<Edition>(this, "./docs-json/edition.json", Edition);
  DocumentCreator.loadTo<ExhibitionType>(this,"./docs-json/exhibition-type.json",ExhibitionType);
  DocumentCreator.loadTo<EditionType>(this,"./docs-json/edition-type.json",EditionType);
  DocumentCreator.loadTo<Exhibition>(this,"./docs-json/exhibition.json",Exhibition);
  DocumentCreator.loadTo<Genre>(this, "./docs-json/genre.json", Genre);
  DocumentCreator.loadTo<GroupOfWork>(this,"./docs-json/group-of-work.json",GroupOfWork);
  DocumentCreator.loadTo<Note>(this, "./docs-json/note.json", Note);
  DocumentCreator.loadTo<PublicationMedium>(this,"./docs-json/publication-medium.json",PublicationMedium);
  DocumentCreator.loadTo<PublicationType>(this,"./docs-json/publication-type.json",PublicationType);
  DocumentCreator.loadTo<PublicationWhat>(this,"./docs-json/publication-what.json",PublicationWhat);
  DocumentCreator.loadTo<Publication>(this,"./docs-json/publication.json",Publication);
  DocumentCreator.loadTo<Rental>(this, "./docs-json/rental.json", Rental);
  DocumentCreator.loadTo<ResumeType>(this,"./docs-json/resume-type.json",ResumeType);
  DocumentCreator.loadTo<Resume>(this, "./docs-json/resume.json", Resume);
  DocumentCreator.loadTo<SaleRightsOfUseType>(this,"./docs-json/sale-rights-of-use-type.json",SaleRightsOfUseType);
  DocumentCreator.loadTo<SaleRightsOfUse>(this,"./docs-json/sale-rights-of-use.json",SaleRightsOfUse);
  DocumentCreator.loadTo<SaleType>(this,"./docs-json/sale-type.json",SaleType);
  DocumentCreator.loadTo<Sale>(this, "./docs-json/sale.json", Sale);
  DocumentCreator.loadTo<Tag>(this, "./docs-json/tag.json", Tag);
  DocumentCreator.loadTo<DocWhiteboard>(this,"./docs-json/whiteboards.json",DocWhiteboard);
}
