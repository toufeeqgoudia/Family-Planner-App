import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import recipeImg from "../../Images/recipe/recipes.jpg";

const recipe_id = import.meta.env.VITE_RECIPE_ID;
const recipe_key = import.meta.env.VITE_RECIPE_KEY;

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await fetch(
          `https://api.edamam.com/search?q=${query}&app_id=${recipe_id}&app_key=${recipe_key}`
        );
        const data = await response.json();
        setRecipes(data.hits);
      } catch (error) {
        console.log(error.message);
      }
    };

    getRecipes();
  }, [query]);

  const handleSearch = ({ currentTarget = {} }) => {
    const { value } = currentTarget;
    setQuery(value);
  };

  return (
    <div className="mt-20 mb-20 flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold text-center">Recipes</h2>

      <div className="mt-10 pb-10 w-full flex justify-center">
        <form className="flex w-4/5 max-w-2xl justify-center">
          <TextField
            size="medium"
            placeholder="Search Recipes"
            sx={{ width: "80%" }}
            autoComplete="off"
            onChange={handleSearch}
          />
        </form>
      </div>

      {recipes.length > 0 ? (
        <div className="w-full flex flex-wrap justify-evenly items-center">
          {recipes.map((recipe) => (
            <Accordion
              key={recipe.recipe.label}
              sx={{
                width: "320px",
                minHeight: "200px",
                marginTop: "40px",
                padding: "12px",
                borderRadius: "8px",
                bgcolor: "rgb(203, 213, 225)",
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ display: "flex", flexDirection: "column" }}>
                  <h3 className="text-lg font-bold">
                    {recipe.recipe.label}
                    <span className="text-sm font-light italic">
                      - {recipe.recipe.cuisineType}
                    </span>
                  </h3>
                  <img
                    src={recipe.recipe.image}
                    className="w-24 self-center shadow-2xl"
                  />
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <h4 className="text-base font-medium">Ingredients:</h4>
                  <ul>
                    {recipe.recipe.ingredientLines.map((ing, index) => (
                      <li key={index} className="text-sm">
                        {ing}
                      </li>
                    ))}
                  </ul>
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-wrap justify-evenly items-center">
          <img src={recipeImg} className="w-4/5" />
        </div>
      )}
    </div>
  );
};

export default Recipe;
