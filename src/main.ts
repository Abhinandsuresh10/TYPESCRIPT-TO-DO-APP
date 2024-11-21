import './css/style.css'
import FullList from './model/fullList';
import ListItem from './model/listItem';
import listTemplate from './templates/listTemplate';

const initApp = (): void => {
    const fullList = FullList.instance
    const template = listTemplate.instance

    const itemEntryForm = document.getElementById('itemEntryForm') as HTMLFormElement
    itemEntryForm.addEventListener('submit',(event: SubmitEvent): void => {
        event?.preventDefault()
        
        const input = document.getElementById('newItem') as HTMLInputElement
        const newEntryText: string = input.value.trim()
        if(!newEntryText.length) return
        const itemId: number = fullList.list.length
        ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
        : 1

        const newItem = new ListItem(itemId.toString(), newEntryText)

        fullList.addItem(newItem)
    });

    const clearItems = document.getElementById('clearItemsButton') as HTMLButtonElement

    clearItems.addEventListener('click', (): void => {
        fullList.clearList()
        template.clear()
    })

    fullList.load()
    template.render(fullList)
}

document.addEventListener('DOMContentLoaded',initApp);

document.querySelector<HTMLFormElement>('#todo-form')?.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const input = document.querySelector<HTMLInputElement>('#todo-input');
    if (input?.value) {
      console.log(input.value);
      input.value = ''; 
    }
  });

