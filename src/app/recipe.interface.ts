// recipe.interface.ts

export interface Recipe {
    name: string; 
    ingredients: Ingredients[]; 
    steps: Steps[]; 
}

export interface Ingredients {
    ingredient: string;  // required field
    amount: string; 
}

export interface Steps {
    step: string;  // required field
}

