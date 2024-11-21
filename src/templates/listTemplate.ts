import FullList from "../model/fullList";


interface DomList {
    ul: HTMLUListElement,
    clear(): void,
    render(fullList: FullList): void,
}

// export default class listTemplate implements DomList {

//     ul: HTMLUListElement

//     static instance: listTemplate = new listTemplate()

//     private constructor() {
//         this.ul = document.getElementById('todo-list') as HTMLUListElement
//     }

//     clear(): void {
//         this.ul.innerHTML = ''
//     }

//     render(fullList: FullList): void {
//         this.clear()

//         fullList.list.forEach(item => {
//            const li = document.createElement('li') as HTMLLIElement
//            li.className = 'todo'

//            const check = document.createElement('input') as HTMLInputElement
//            check.type = 'checkbox'
//            check.id = item.id
//            check.tabIndex = 0;
//            check.checked = item.checked
//            li.append(check)

//            check.addEventListener('change',() => {
//             item.checked = !item.checked
//             fullList.save()
//            });

//            const label = document.createElement('label') as HTMLLabelElement
//            label.htmlFor = item.id
//            label.textContent = item.item
//            li.append(label);


//            const button = document.createElement('button') as HTMLButtonElement
//            button.className = 'button'
//            button.textContent = 'X'
//            li.append(button) 

//            button.addEventListener('click',() => {
//             fullList.removeItem(item.id)
//             this.render(fullList)
//            })


//            this.ul.append(li)
//         });
//     }
// } 
export default class listTemplate implements DomList {
    ul: HTMLUListElement;

    static instance: listTemplate = new listTemplate();

    private constructor() {
        this.ul = document.getElementById('todo-list') as HTMLUListElement;
    }

    clear(): void {
        this.ul.innerHTML = '';
    }

    render(fullList: FullList): void {
        this.clear();

        fullList.list.forEach(item => {
            const li = document.getElementById(`todo-${item.id}`) as HTMLLIElement;
            if (li) {
                const check = li.querySelector('input[type="checkbox"]') as HTMLInputElement;
                const label = li.querySelector('label.todo-text') as HTMLLabelElement;
                const deleteButton = li.querySelector('button.delete-button') as HTMLButtonElement;

                check.checked = item.checked;
                label.textContent = item.item;

                check.addEventListener('change', () => {
                    item.checked = !item.checked;
                    fullList.save();
                    this.render(fullList); 
                });

                deleteButton.addEventListener('click', () => {
                    fullList.removeItem(item.id);
                    this.render(fullList); 
                });
            } else {
                console.warn(`List item with ID todo-${item.id} not found`);
            }
        });
    }
}