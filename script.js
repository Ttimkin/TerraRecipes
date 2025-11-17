let button = document.getElementById('search');
const forCards = document.getElementById('forCards');
const forItemImg = document.getElementById('forItemImg');
const forItemName = document.getElementById('forItemName');

button.addEventListener('click', () => {
    const input = document.getElementById('input').value;
    if (input) {
        forCards.innerHTML = '';
        forItemImg.src = '';
        forItemName.textContent = '';
        fetch('https://raw.githubusercontent.com/cr0wst/terraria-info/refs/heads/master/json/items.json')
            .then(Items => Items.json())
            .then(Items => {
                let isFound = false;
                indexOfItem = 0;
                for (indexOfItem; indexOfItem < Items.length; indexOfItem++) {
                    if (input === Items[indexOfItem]['name']) {
                        isFound = true;
                        break;
                    };
                };
                if (isFound) {
                    const ItemName = Items[indexOfItem]['name'];
                    const ItemImgSrc = `https://images.weserv.nl/?url=terraria.wiki.gg/images/${ItemName.replace(/ /g, '_').replace(/'/g, "%27")}.png`;
                    forItemName.textContent = ItemName;
                    forItemImg.src = ItemImgSrc;
    
                    if (Items[indexOfItem]['recipe1']) {
                        let recipes = [];
                        for (i = 1; i <= 6; i++) {
                            if (!Items[indexOfItem][`recipe${i}`]) break;
                            recipes.push(Items[indexOfItem][`recipe${i}`]);
                        };
                        fetch('https://raw.githubusercontent.com/cr0wst/terraria-info/refs/heads/master/json/recipes.json')
                            .then(Recipes => Recipes.json())
                            .then(Recipes => {
                                for (currRecipe of recipes) {
                                    let divCard = document.createElement('div');
                                    divCard.className = 'card fb';
    
                                    let divCardTitle = document.createElement('div');
                                    divCardTitle.className = 'card_title fb';
                                    let imgCardTitle = document.createElement('img');
                                    imgCardTitle.src = ItemImgSrc;
                                    divCardTitle.append(imgCardTitle);
                                    let h3CardTitle = document.createElement('h3');
                                    h3CardTitle.textContent = ItemName;
                                    if (Recipes[Number(currRecipe)-1]['quantity'] !== '1') {
                                        h3CardTitle.textContent += ` (x${Recipes[Number(currRecipe)-1]['quantity']})`;
                                    };
                                    divCardTitle.append(h3CardTitle);
                                    divCard.append(divCardTitle);
    
                                    let divCardIngredients = document.createElement('div');
                                    divCardIngredients.className = 'card_stuff fb';
                                    let divCardIngredientsTitle = document.createElement('div');
                                    divCardIngredientsTitle.className = 'card_titles fb';
                                    let h4CardIngredientsTitle = document.createElement('h4');
                                    h4CardIngredientsTitle.textContent = 'Ингредиенты';
                                    divCardIngredientsTitle.append(h4CardIngredientsTitle);
                                    divCardIngredients.append(divCardIngredientsTitle);
                                    let ulCardIngredients = document.createElement('ul');
                                    for (i = 1; Recipes[Number(currRecipe)-1][`ingredient${i}`]; i++) {
                                        let li = document.createElement('li');
                                        indexOfIngredient = Number(Recipes[Number(currRecipe)-1][`ingredient${i}`])-1;
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
                                    divCard.append(divCardIngredients);
    
                                    let divCardTable = document.createElement('div');
                                    divCardTable.className = 'card_stuff end fb';
                                    let divCardTableTitle = document.createElement('div');
                                    divCardTableTitle.className = 'card_titles fb';
                                    let h4CardTableTitle = document.createElement('h4');
                                    h4CardTableTitle.textContent = 'Рабочее место';
                                    divCardTableTitle.append(h4CardTableTitle);
                                    divCardTable.append(divCardTableTitle);
                                    if (Recipes[Number(currRecipe)-1]['table'] === '7') {
                                        let pCardTable = document.createElement('p');
                                        pCardTable.textContent = 'Нет';
                                        divCardTable.append(pCardTable);
                                    } else {
                                        fetch('https://raw.githubusercontent.com/cr0wst/terraria-info/refs/heads/master/json/tables.json')
                                            .then(Tables => Tables.json())
                                            .then(Tables => {
                                                const TableName = Tables[Number(Recipes[Number(currRecipe)-1]['table'])-1]['name'];
                                                const TableName2 = Tables[Number(Recipes[Number(currRecipe)-1]['table'])-1]['alternate_name'];
                                                let ulCardTable = document.createElement('ul');
                                                let li = document.createElement('li');
                                                let imgTable = document.createElement('img');
                                                imgTable.src = `https://images.weserv.nl/?url=terraria.wiki.gg/images/${TableName.replace(/ /g, '_').replace(/'/g, "%27")}.png`;
                                                imgTable.className = 'ico';
                                                li.append(imgTable);
                                                let pTable = document.createElement('p');
                                                pTable.textContent = TableName;
                                                li.append(pTable);
                                                ulCardTable.append(li);
                                                if (TableName2) {
                                                    let separator = document.createElement('li');
                                                    separator.className = 'separator';
                                                    let pSeparator = document.createElement('p');
                                                    pSeparator.textContent = 'ИЛИ';
                                                    separator.append(pSeparator);
                                                    ulCardTable.append(separator);
                                                    let li2 = document.createElement('li');
                                                    let imgTable2 = document.createElement('img');
                                                    imgTable2.src = `https://images.weserv.nl/?url=terraria.wiki.gg/images/${TableName2.replace(/ /g, '_').replace(/'/g, "%27")}.png`;
                                                    imgTable2.className = 'ico';
                                                    li2.append(imgTable2);
                                                    let pTable2 = document.createElement('p');
                                                    pTable2.textContent = TableName2;
                                                    li2.append(pTable2);
                                                    ulCardTable.append(li2);
                                                };
                                                divCardTable.append(ulCardTable);
                                            })
                                    };
                                    divCard.append(divCardTable);
    
                                    forCards.append(divCard);
                                };
                            })
                    } else {
                        let divNoRecipe = document.createElement('div');
                        divNoRecipe.className = 'nocard fb';
                        let h3NoRecipe = document.createElement('h3');
                        h3NoRecipe.textContent = 'Рецептов не найдено!';
                        divNoRecipe.append(h3NoRecipe);
                        forCards.append(divNoRecipe);
                    };
                } else {
                    forItemName.textContent = 'Предмет не найден!'
                };
            });
    };

});
