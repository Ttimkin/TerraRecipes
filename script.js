const Button = document.getElementById('search');
const ForRecipes = document.getElementById('forRecipes');
const ForUsages = document.getElementById('forUsages');
const ForItemImg = document.getElementById('forItemImg');
const ForItemName = document.getElementById('forItemName');

let isFirst = true;
let memory = null;

Button.addEventListener('click', () => {
    const input = document.getElementById('input').value.toLowerCase();
    if (input) {
        if (isFirst || input !== memory) {
            memory = input;
            isFirst = false;
            
            ForRecipes.innerHTML = '';
            ForUsages.innerHTML = '';
            ForItemImg.src = '';
            ForItemName.textContent = '';
            fetch('https://raw.githubusercontent.com/cr0wst/terraria-info/refs/heads/master/json/items.json')
                .then(Items => Items.json())
                .then(Items => {
                    let isFound = false;
                    indexOfItem = 0;
                    for (indexOfItem; indexOfItem < Items.length; indexOfItem++) {
                        if (input === Items[indexOfItem]['name'].toLowerCase()) {
                            isFound = true;
                            break;
                        };
                    };
                    if (isFound) {
                        const ItemName = Items[indexOfItem]['name'];
                        const ItemId = Items[indexOfItem]['id'];
                        const ItemImgSrc = `https://images.weserv.nl/?url=terraria.wiki.gg/images/${ItemName.replace(/ /g, '_').replace(/'/g, "%27")}.png`;
                        ForItemName.textContent = ItemName;
                        ForItemImg.src = ItemImgSrc;
                        
                        // создание карточек рецептов этого предмета
                        if (Items[indexOfItem]['recipe1']) {
                            let h2Recipes = document.createElement('h2');
                                h2Recipes.textContent = 'Рецепты:';
                                ForRecipes.append(h2Recipes);
                                
                                let recipes = [];
                                for (i = 1; i <= 6; i++) {
                                    if (!Items[indexOfItem][`recipe${i}`]) break;
                                    recipes.push(Items[indexOfItem][`recipe${i}`]);
                                };
                                fetch('https://raw.githubusercontent.com/cr0wst/terraria-info/refs/heads/master/json/recipes.json')
                                    .then(Recipes => Recipes.json())
                                    .then(Recipes => {
                                        fetch('https://raw.githubusercontent.com/cr0wst/terraria-info/refs/heads/master/json/tables.json')
                                            .then(Tables => Tables.json())
                                            .then(Tables => {
                                                function creatingACards(recipesArr, whereAppend) {
                                                    for (currRecipe of recipesArr) {
                                                        // создание div карточки
                                                        let divCard = document.createElement('div');
                                                        divCard.className = 'card fb';
                                                
                                                        // поиск индекса предмета, для которого создаётся карточка
                                                        let help_indexOfItem = Number(Recipes[Number(currRecipe)-1]['name']);
                                                        while (Items[help_indexOfItem]['id'] !== Recipes[Number(currRecipe)-1]['name']) help_indexOfItem--;
                                                        
                                                        // создание заголовка карточки
                                                        let divCardTitle = document.createElement('div');
                                                        divCardTitle.className = 'card_title fb';
                                                        let imgCardTitle = document.createElement('img');
                                                        imgCardTitle.src = `https://images.weserv.nl/?url=terraria.wiki.gg/images/${Items[help_indexOfItem]['name'].replace(/ /g, '_').replace(/'/g, "%27")}.png`;
                                                        divCardTitle.append(imgCardTitle);
                                                        let h3CardTitle = document.createElement('h3');
                                                        h3CardTitle.textContent = Items[help_indexOfItem]['name'];
                                                        if (Recipes[Number(currRecipe)-1]['quantity'] !== '1') {
                                                            h3CardTitle.textContent += ` (x${Recipes[Number(currRecipe)-1]['quantity']})`;
                                                        };
                                                        divCardTitle.append(h3CardTitle);
                                                        // добавление заголовка в карточку
                                                        divCard.append(divCardTitle);
                                                
                                                        // создание блока ингредиентов
                                                        let divCardIngredients = document.createElement('div');
                                                        divCardIngredients.className = 'card_stuff fb';
                                                        let divCardIngredientsTitle = document.createElement('div');
                                                        divCardIngredientsTitle.className = 'card_titles fb';
                                                        let h4CardIngredientsTitle = document.createElement('h4');
                                                        h4CardIngredientsTitle.textContent = 'Ингредиенты';
                                                        divCardIngredientsTitle.append(h4CardIngredientsTitle);
                                                        divCardIngredients.append(divCardIngredientsTitle);
                                                        let ulCardIngredients = document.createElement('ul');
                                                        // создание списка ингредиентов
                                                        for (i = 1; Recipes[Number(currRecipe)-1][`ingredient${i}`]; i++) {
                                                            let li = document.createElement('li');
                                                            let indexOfIngredient = Number(Recipes[Number(currRecipe)-1][`ingredient${i}`])-1;
                                                            while (Items[indexOfIngredient]['id'] !== Recipes[Number(currRecipe)-1][`ingredient${i}`]) indexOfIngredient--;
                                                            const IngredientName = Items[indexOfIngredient]['name'];
                                                            let imgIngredient = document.createElement('img');
                                                            imgIngredient.src = `https://images.weserv.nl/?url=terraria.wiki.gg/images/${IngredientName.replace(/ /g, '_').replace(/'/g, "%27")}.png`;
                                                            imgIngredient.className = 'ico';
                                                            li.append(imgIngredient);
                                                            let pIngredient = document.createElement('p');
                                                            pIngredient.textContent = IngredientName;
                                                            li.append(pIngredient);
                                                            let spanIngredient = document.createElement('span');
                                                            spanIngredient.textContent = Recipes[Number(currRecipe)-1][`amount${i}`] + 'x';
                                                            li.append(spanIngredient);
                                                            ulCardIngredients.append(li);
                                                        };
                                                        divCardIngredients.append(ulCardIngredients);
                                                        // добавление блока ингредиентов в карточку
                                                        divCard.append(divCardIngredients);
                                                
                                                        // создание блока с необходимым(и) рабочим(и) местом(-ами)
                                                        let divCardTable = document.createElement('div');
                                                        divCardTable.className = 'card_stuff end fb';
                                                        let divCardTableTitle = document.createElement('div');
                                                        divCardTableTitle.className = 'card_titles fb';
                                                        let h4CardTableTitle = document.createElement('h4');
                                                        h4CardTableTitle.textContent = 'Рабочее место';
                                                        divCardTableTitle.append(h4CardTableTitle);
                                                        divCardTable.append(divCardTableTitle);
                                                        console.log(currRecipe);
                                                        if (Recipes[Number(currRecipe)-1]['table'] === '7') {
                                                            let ulCardTable = document.createElement('ul');
                                                            let li = document.createElement('li');
                                                            let pTable = document.createElement('p');
                                                            pTable.textContent = 'Нет';
                                                            li.append(pTable);
                                                            ulCardTable.append(li);
                                                            divCardTable.append(ulCardTable);
                                                        } else {
                                                            // console.log(Recipes[Number(currRecipe)-1]['table']);
                                                            let tableName = Tables[Number(Recipes[Number(currRecipe)-1]['table'])-1]['name'];
                                                            let tableName2 = Tables[Number(Recipes[Number(currRecipe)-1]['table'])-1]['alternate_name'];
                                                            let ulCardTable = document.createElement('ul');
                                                            let li = document.createElement('li');
                                                            let imgTable = document.createElement('img');
                                                            imgTable.src = `https://images.weserv.nl/?url=terraria.wiki.gg/images/${tableName.replace(/ /g, '_').replace(/'/g, "%27")}.png`;
                                                            imgTable.className = 'ico';
                                                            li.append(imgTable);
                                                            let pTable = document.createElement('p');
                                                            pTable.textContent = tableName;
                                                            li.append(pTable);
                                                            ulCardTable.append(li);
                                                            // добавление альтернативного рабочего места при его наличии
                                                            if (tableName2) {
                                                                let separator = document.createElement('li');
                                                                separator.className = 'separator';
                                                                let pSeparator = document.createElement('p');
                                                                pSeparator.textContent = 'ИЛИ';
                                                                separator.append(pSeparator);
                                                                ulCardTable.append(separator);
                                                                let li2 = document.createElement('li');
                                                                let imgTable2 = document.createElement('img');
                                                                imgTable2.src = `https://images.weserv.nl/?url=terraria.wiki.gg/images/${tableName2.replace(/ /g, '_').replace(/'/g, "%27")}.png`;
                                                                imgTable2.className = 'ico';
                                                                li2.append(imgTable2);
                                                                let pTable2 = document.createElement('p');
                                                                pTable2.textContent = tableName2;
                                                                li2.append(pTable2);
                                                                ulCardTable.append(li2);
                                                            };
                                                            divCardTable.append(ulCardTable);
                                                        };
                                                        // добавление блока раюочего места в карточку
                                                        divCard.append(divCardTable);
                                                        
                                                        // добавление карточки на сайт
                                                        whereAppend.append(divCard);
                                                    };
                                                };
                                                creatingACards(recipes, ForRecipes);

                                                let usages = [];
                                                for (current of Recipes) {
                                                    for (i = 1; i <= 6; i++) {
                                                        if (current[`ingredient${i}`]) {
                                                            if (current[`ingredient${i}`] === ItemId) usages.push(current['id']);
                                                        } else break;
                                                    };
                                                };
                                                if (usages[0]) {
                                                    let h2Usages = document.createElement('h2');
                                                    h2Usages.textContent = 'Применения:';
                                                    ForUsages.append(h2Usages);

                                                    creatingACards(usages, ForUsages);
                                                };
                                            });
                                    });
                            } else {
                                // оповещение о том, что рецептов не найдено
                                let divNoRecipe = document.createElement('div');
                                divNoRecipe.className = 'nocard fb';
                                let h3NoRecipe = document.createElement('h3');
                                h3NoRecipe.textContent = 'Рецептов не найдено!';
                                divNoRecipe.append(h3NoRecipe);
                                ForRecipes.append(divNoRecipe);
                            };
                        } else {
                            // оповещение, что предмет не найден
                            ForItemName.textContent = 'Предмет не найден!'
                        };
                    });
        };
    };
});
