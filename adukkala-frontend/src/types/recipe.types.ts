export interface Recipe {
    id: number;
    title: string;
    image: string;
    readyInMinutes?: number;
    summary?: string;
}

export interface RecipeDetail {
    id: number;
    title: string;
    image: string;
    summary: string;

    ingredients: string[];

    instructions: string[];

    nutrition: {
        calories?: string;
        protein?: string;
        fat?: string;
        carbs?: string;
    };
}