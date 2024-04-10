# Make Crud

## <a name="introduction">✨ Introduction</a>

Le make crud est un script js qui permet de créer un crud complet en VueJS avec Nuxt pour une entité de votre API.

Avec ce make crud vous pourrez :
- Personnaliser votre route
- Définir les colonnes que vous voulez
- Créer l'interface de votre entité
- Réduire le temps de travail pour créer un CRUD

### Sommaire

- ✨ [Introduction](#introduction)
- 😎 [Informations utiles](#informations-utiles)
- 🛫 [Commencer](#commencer)
- 📝 [Étapes de création](#étapes-de-création)
- ⚙️ [Paramétrage](#paramétrage)
  - [``dataTableTemplates.const.ts``](#fichier-datatabletemplatesconstts)
  - [``defaultValue.const.ts``](#fichier-defaultvalueconstts)
  - [``FormNameEntity``](#fichier-formnameentity)
  - [``index.ts``](#fichier-indexts)
  - [``tableHeaders.const.ts``](#constante-tableheadersconst)
  - [``titles.const.ts``](#fichier-titlesconstts)
  - [``./src/types/monEntite.ts``](#fichier-srctypesmonentitets)

## <a name="informations-utiles">😎 Informations utiles</a>

|                                |                                                                                 |
|--------------------------------|---------------------------------------------------------------------------------|
| Valider une étape              | Appuyer sur <kbd>Enter</kbd>                                                    |
| Arrêter la création            | Faire la combinaison des touches <kbd>Ctrl</kbd> + <kbd>C</kbd>                 |
| Connaître la valeur par défaut | La valeur par défaut est en jaune et en majuscule s'il y a plusieurs choix      |
| Utiliser la valeur par défaut  | Valider l'étape en laissant le champ vide **ou** en appuyant sur <kbd>Tab</kbd> |
|                                |                                                                                 |

## <a name="commencer">🛫 Commencer</a>

Pour commencer à créer votre CRUD, entrer la commande suivante dans un terminal :

```bash
npm run make:crud
```

Un rappel avec les informations utiles vous sera donné à l'exécution de la commande.

## <a name="étapes-de-création">📝 Étapes de création</a>
<pre>
<span style="color:green">Enter the name of the entity from the API</span>
>
</pre>
> Le nom de l'entité doit correspondre à une entité de l'API
---
<pre>
<span style="color:green">Enter the Route for this entity</span> (default: <span style="color:yellow">monEntite</span>)
>
</pre>
> Il s'agira de la route qui mènera aux informations de l'entité
---
<pre>
<span style="color:green">Do you want to configure the table ?</span> [<span style="color:yellow">Y</span>/n]
>
</pre>
> Si vous acceptez, vous configurerez les colonnes du tableau de données de votre entité
---
<pre>
<span style="color:green">Create a new column for the CRUDtable</span> [key:title/<span style="color:yellow">N</span>]
>
</pre>

> Vous obtiendrez cette étape si vous avez accepté celle d'avant.\
> Cette étape se fera en boucle tant que vous ne mettrez pas un `N`.\
> Pour une colonne, vous devez écrire sous le format `key:title` avec `key` qui représente une clé sur votre entité côté API et `title` le nom de la colonne. 
---
<pre>
<span style="color:green">Do you want to configure the interface ?</span> [<span style="color:yellow">Y</span>/n]
>
</pre>
> Si vous acceptez, vous configurerez l'interface du tableau de données.
---
<pre>
<span style="color:green">Add property</span> [name(?):types/<span style="color:yellow">N</span>]
>
</pre>
> Vous obtiendrez cette étape si vous avez accepté celle d'avant.\
> Cette étape se fera en boucle tant que vous ne mettrez pas un `N`.\
> Pour une propriété, vous devez écrire sous le format `name(?):types` avec `name(?)` qui représente la clé de votre entité côté API et `types` le type de la propriété. Le `(?)` signifie que vous pouvez mettre un `?` après le nom si vous voulez que la propriété soit optionel
---

Une fois ces étapes finis, vous devriez avoir la liste des dossiers et fichiers qui se sont créés.\
⚠️ Si vous avez configuré l'interface avec le makeCrud, pensez à aller dans `./src/types/monEntite.ts` et à importer les types s'ils ne sont pas natifs !

## <a name="paramétrage">⚙️ Paramétrage</a>

Dans le répertoire `./domains`, votre entité vient d'être crée sous le nom de celui que vous avez donné et sous la forme d'un dossier.
Ce dossier est constitué de plusieurs fichiers :

| Fichier             	       | Description                                                    |
|-----------------------------|----------------------------------------------------------------|
| dataTableTemplates.const.ts | `Tableau permettant de personnaliser les cases d'une colonne.` |
| defaultValue.const.ts       | `Valeurs par défaut.`                                          |
| Form*NameEntity*            | `Composant Vue.`                                               |
| index.ts                    | `Fichier global d'imports`                                     |
| tableHeaders.const.ts	      | `Tableau d'en-tête.`                                           |
| titles.const.ts			          | `Titres du composant.`                                         |

## **Fichier: `dataTableTemplates.const.ts`**

### Documentation

Ce fichier contient les définitions de modèles de templates utilisés pour chaque case du tableau de l'application. Les templates définissent la manière dont les données sont affichées dans les différentes colonnes du tableau.

### Interface `DataTableTemplate`

Cette interface définit la structure d'un template de tableau.

| Propriété       | Requis | Description                                                                                                                                                                                                                                    |
|-----------------|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **`key`**       | ✅      | Une clé unique identifiant le template. Cette clé est utilisée pour associer le template à une colonne spécifique du tableau. Elle correspond au paramètre de l'entité ciblée.                                                                 |
| **`component`** | ✅      | Le composant utilisé pour afficher les données dans la colonne correspondante. Par exemple, `VChip` dans l'exemple donné ci-dessous.                                                                                                           |
| **`target`**    | ❌      | Une chaîne de caractères décrivant la propriété du composant qui recevra `value`, soit la valeur de la case. Par exemple, `'text'` dans l'exemple indique que la props `'text'` du composant `VChip` aura pour valeur `value`.                 |
| **`props`**     | ❌      | Un objet contenant les propriétés (ou attributs) à appliquer au composant. Ces propriétés peuvent être utilisées pour personnaliser l'apparence ou le comportement du composant.                                                               |
| **`handlers`**  | ❌      | Un objet contenant les gestionnaires d'événements à associer au composant. Ces gestionnaires d'événements peuvent être utilisés pour définir des actions à effectuer lorsque certaines interactions (`emits`) se produisent avec le composant. |

### 'VChip'

Un exemple de définition de template est fourni ci-dessous :

```typescript
{
  key: 'price',  
  component: VChip,
  target: 'text',   
  props: {  
    appendIcon: 'mdi-currency-eur',  
  },  
}
```

Dans cet exemple :
- La clé du template est `'price'`, ce qui signifie qu'il est associé à la colonne contenant les prix dans le tableau.
- Le composant utilisé est `VChip`.
- La props du composant `VChip` ciblée pour recevoir value est `text`.
- Les propriétés spécifiées pour le composant incluent `appendIcon`, qui indique une icône à ajouter au composant, dans ce cas, l'icône de l'euro (`'mdi-currency-eur'`).

### 'actions'

```typescript
{  
  key: 'actions',  
  component: AppCrudTableActions,  
  handlers: {  
  edit: (item: ProductInterface) =>  
      useRouter().push(`/products/update/${item.id}`),  
  },  
  props: {  
  deleteItemFunction: (item: ProductInterface) =>  
      handleDeleteItem(`/api/products/${item.id}`),  
    entity: 'products',  
  },  
},
```

Cet exemple définit un modèle de template pour une colonne spécifique du tableau, souvent nommée "actions". Cette colonne est généralement utilisée pour afficher des actions ou des opérations que l'utilisateur peut effectuer sur chaque élément du tableau.

Voici une explication simplifier de ce que font chaque propriété :

| Propriété   | Type      | Description                                                                                                                    |
|-------------|-----------|--------------------------------------------------------------------------------------------------------------------------------|
| `key`       | string    | Spécifie la clé du template qui est définie comme `'actions'` dans l'exemple. Elle associe ce modèle à une colonne du tableau. |
| `component` | Component | Spécifie le composant à utiliser pour afficher les données dans la colonne.                                                    |
| `handlers`  | Object    | Les handlers sont les **emits** de votre composant. Dans le cas de l'exemple, l'emit `edit` est définit.                       |
| `props`     | Object    | Les props sont les **props** de votre composant. Dans l'exemple, il y a deux props : `deleteItemFunction` et `entity`.         |

En résumé, cet exemple définit un modèle de template pour une colonne d'actions dans un tableau. Il spécifie le composant à utiliser pour afficher les actions, ainsi que les gestionnaires d'événements et les propriétés associées à ce composant pour gérer les actions telles que l'édition et la suppression des éléments du tableau.

## **Fichier: `defaultValue.const.ts`**

### Documentation

Ce fichier contient une constante nommée `defaultValueConst`, qui définit les valeurs par défaut pour les différents champs d'utilisateur, à l'exception de l'identifiant (`id`). Cette constante est souvent utilisée dans le cadre de la création ou de la modification d'utilisateurs dans une application.
```typescript
export const defaultValueConst = {  
  firstName: '',  
  lastName: '',  
  gender: '',  
  email: '',  
  phone: '',  
  password: '',  
  image: '',  
  admin: false,  
} satisfies Omit<UserInterface, 'id'>
```

## **Fichier: `FormNameEntity`**

### Documentation

Ce fichier, `FormNameEntity.vue`, est un composant Vue.js qui représente un formulaire permettant de saisir les données voulues.

#### Script

Le script déclare les propriétés, les événements émis et les calculs utilisés dans le composant.

-   **Props**: Le composant attend une seule prop nommée `modelValue`, qui représente la valeur du modèle associé au formulaire.

-   **Emits**: Le composant émet un événement `'update:modelValue'` lorsqu'il y a une modification dans la valeur concernée. L'événement transporte la nouvelle valeur du modèle.

-   **Computed**: Le calcul `nameEntity` est utilisé pour gérer la valeur du modèle du camion-citerne. Il récupère la valeur actuelle du modèle et émet un événement lorsque la valeur est modifiée.

```vue
<script setup lang="ts">
  import type {NameEntityInterface} from '~/types/nameEntity'  
  import {FORM_VALIDATIONS_RULES} from '~/constants/formValidationsRules.const'  
    
  /** PROPS **/
  interface Props {
    modelValue: unknown  
  }  
    
  const props = defineProps<Props>()  
    
  /** EMITS **/  
  type Emits = {  
    'update:modelValue': [  
      value: NameEntityInterface | Omit<TankerInterface, 'id'>,  
    ]  
  }  
  const emit = defineEmits<Emits>()  
    
  /** COMPUTED **/  
  const nameEntity = computed({  
    get: () =>  
       props.modelValue as NameEntityInterface | Omit<TankerInterface, 'id'>,  
    set: (value) => emit('update:modelValue', value),  
  })
</script> 
  
<template>  
  <v-text-field
    v-model="nameEntity.exemple"  
    label="Exemple"  
    :rules="[FORM_VALIDATIONS_RULES.required]"  
  />
</template>
```

## **Fichier: `index.ts`**

### Documentation

Ce fichier est responsable de l'exportation des composants, des constantes et des données associées à la gestion des informations de l'entité dans une application. Voici une explication détaillée de chaque exportation :

#### Composant de Formulaire de l'entité

- **`FormComponent`** : Ce composant est importé depuis le fichier `~/domains/nameEntity/NameEntity.vue`. Il est ensuite exporté sous le nom `FormComponent`. Ce composant est utilisé pour afficher et gérer le formulaire de saisie des informations de l'entité.

#### Constantes et Données

| Nom                       | Description                                                                                                                                                                                                 |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `defaultValueConst`       | Cette constante est exportée depuis le fichier `~/domains/nameEntity/defaultValue.const`. Elle contient les valeurs par défaut pour les champs de l'entité.                                                 |
| `tableHeadersConst`       | Cette constante est exportée depuis le fichier `~/domains/nameEntity/tableHeaders.const`. Elle contient les en-têtes de tableau pour afficher les informations de l'entité dans une table.                  |
| `titles`                  | Cette constante est exportée depuis le fichier `~/domains/nameEntity/titles.const`. Elle contient les titres utilisés dans l'interface utilisateur pour les différentes sections liées à l'entité.          |
| `dataTableTemplatesConst` | Cette constante est exportée depuis le fichier `~/domains/nameEntity/dataTableTemplates.const`. Elle contient les modèles de templates utilisés pour personnaliser l'affichage de l'entité dans un tableau. |

### Utilisation

Ces exports sont destinés à être utilisés dans d'autres parties de l'application pour accéder aux composants, constantes et données associées à la gestion des informations de l'entité. Par exemple, le composant `FormComponent` peut être intégré dans d'autres vues pour afficher un formulaire de saisie des informations de l'entité, tandis que les constantes peuvent être utilisées pour initialiser les données et personnaliser l'affichage dans divers composants et vues de l'application.

```typescript
import NameEntity from '~/domains/nameEntity/FormNameEntity.vue'  

const FormComponent = FormNameEntity
export {defaultValueConst} from '~/domains/nameEntity/defaultValue.const'  
export {tableHeadersConst} from '~/domains/nameEntity/tableHeaders.const'  
export {titles} from '~/domains/nameEntity/titles.const'  
export {dataTableTemplatesConst} from '~/domains/nameEntity/dataTableTemplates.const'  
export {FormComponent}

export const route = 'nameEntity'
```

## **Fichier: `tableHeaders.const.ts`**

### Documentation

Ce fichier exporte une constante nommée `tableHeadersConst`, qui contient les en-têtes de tableau pour afficher les informations d'une liste d'éléments. Ces en-têtes sont utilisés pour organiser et présenter les données dans une interface utilisateur sous forme de tableau.\
Si vous avez fait la configuration des colonnes avec le script, vous aurez les objets qui correspondent à vos colonnes ici. 

Voici une explication détaillée de chaque en-tête :

#### Constante `tableHeadersConst`

| Nom        | Description                                                                                                                                                                                                                   |
|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `title`    | Le titre de la colonne. Il indique le libellé affiché dans l'en-tête de la colonne.                                                                                                                                           |
| `align`    | L'alignement du contenu dans la colonne. Les valeurs possibles sont `'start'`, `'center'` et `'end'`, qui déterminent l'alignement à gauche, au centre ou à droite respectivement.                                            |
| `sortable` | Un indicateur booléen indiquant si la colonne est triable ou non. Lorsqu'il est défini sur `true`, les utilisateurs peuvent cliquer sur l'en-tête de colonne pour trier les données en fonction des valeurs de cette colonne. |
| `key`      | La clé ou l'identifiant de la colonne. Cette clé est utilisée pour faire correspondre les données de la colonne avec les données de chaque élément de la liste.                                                               |

La constante `tableHeadersConst` satisfait l'exigence du type `ReadonlyHeaders`, ce qui signifie que les en-têtes de tableau sont en lecture seule et ne peuvent pas être modifiés une fois définis.

```typescript
import type {ReadonlyHeaders} from '~/types/headers'  
 
export const tableHeadersConst = [  
 {title: 'Photo', align: 'start', sortable: false, key: 'thumbnail'},  
  {title: 'Title', align: 'start', sortable: true, key: 'title'},  
  {title: 'Prix', align: 'start', sortable: true, key: 'price'},  
  {title: 'Catégorie', align: 'start', sortable: true, key: 'category'},  
  {title: 'Actions', key: 'actions', sortable: false},  
] satisfies ReadonlyHeaders
```

## **Fichier: `titles.const.ts`**

### Documentation

Ce fichier exporte une constante nommée `titles`, qui contient les titres utilisés dans l'interface utilisateur pour différentes sections liées à la gestion de l'entité dans une application. Voici une explication des titres inclus :

#### Constante `titles`

- **`formTitle`** : Le titre utilisé pour la section du formulaire de saisie des informations de l'entité. Il indique le titre ou le libellé affiché au-dessus du formulaire lorsqu'il est affiché à l'utilisateur.

- **`tableTitle`** : Le titre utilisé pour la section de gestion de l'entité dans un tableau. Il indique le titre ou le libellé affiché au-dessus du tableau lorsqu'il est affiché à l'utilisateur.

### Utilisation

Cette constante peut être utilisée dans les composants et les vues de l'application pour afficher des titres cohérents et descriptifs dans les différentes sections de l'interface utilisateur liées à la gestion de l'entité. Par exemple, le titre `formTitle` peut être utilisé pour identifier la section où l'utilisateur saisit les informations d'un nouveau nameEntity, tandis que le titre `tableTitle` peut être utilisé pour identifier la section où l'entité existant est affiché dans un tableau.

```typescript
export const titles = {  
  formTitle: 'NameEntity',  
  tableTitle: 'Gestion des nameEntity',  
}
```

## **Fichier: `./src/types/monEntite.ts`**

### Documentation

Ce fichier est l'interface pour définir le type de vos colonnes.\
Si vous avez configuré l'interface depuis le script, vous aurez votre configuration dans ce fichier.

Si vous utilisez un type qui n'est pas natif, veuillez ajouter l'import dans ce fichier.

#### Exemple:

```typescript
import type {EntityInterface} from '~/types/entity'
import type {UserInterface} from '~/types/user'       // Import à ajouter
import type {ProductInterface} from '~/types/product' // Import à ajouter

export interface CartInterface extends EntityInterface {
	user: UserInterface               // Type non natif
	products: Array<ProductInterface> // Type non natif
	total: number
}
```