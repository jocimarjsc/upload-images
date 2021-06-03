import { EntityRepository, Repository } from "typeorm";
import { Upload } from "../entities/Upload";

@EntityRepository(Upload)
class UploadRepository extends Repository<Upload>{};

export { UploadRepository }