import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { categories } from '../../db/schema';
import type { Category } from '../types/game';

const categorySelection = {
    id: categories.id,
    name: categories.name,
};

type CategorySelectionRow = {
    id: number;
    name: string;
};

function mapCategory(row: CategorySelectionRow): Category {
    return {
        id: row.id,
        name: row.name,
    };
}

/** All categories ordered by name. */
export async function getAllCategories(db: Database): Promise<Category[]> {
    const rows = await db.select(categorySelection).from(categories).orderBy(asc(categories.name));
    return rows.map(mapCategory);
}
