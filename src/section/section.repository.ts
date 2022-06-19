import { Section } from './section.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Section)
export class SectionRepository extends Repository<Section> { }
