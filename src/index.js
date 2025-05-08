import { setUpAddTodoForm, setupDropZone, setUpSearchForm, setUpSortActions } from "./setup/formsSetup.js";

setUpAddTodoForm();
setUpSearchForm();
setUpSortActions();

setupDropZone("pending");
setupDropZone("completed");
