import { Routes } from '@angular/router';
import { FormRendererComponent } from './Components/form-renderer/form-renderer';
import { FormBuilderComponent } from './Components/form-builder.component/form-builder.component';

export const routes: Routes = [
{
    path:'',
    component:FormBuilderComponent,
},
{
    path:'render',
    component:FormRendererComponent,
}
];
