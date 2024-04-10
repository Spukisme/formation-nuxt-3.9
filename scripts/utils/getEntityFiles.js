import {getFormatedNames} from './getFormatedNames.js'

/**
 * Retrieves the necessary files and their content related to an entity for file generation.
 *
 * @param {string} entityName - The name of the entity.
 * @param {string} routeName - The name of the route.
 * @returns {Array} An array of objects containing file names and their content.
 */
export const getEntityFiles = (entityName, routeName) => {
  const {
    lowercaseName,
    lowercaseSingularName,
    lowercasePluralName,
    capitalizedSingularName,
    formName,
  } = getFormatedNames(entityName)

  return [
    {
      fileName: 'dataTableTemplates.const.ts',
      content:
        "import type {DataTableTemplate} from '~/types/dataTableTemplate.js'\n" +
        "import {AppCrudTableActions} from '#components'\n" +
        `import type {${capitalizedSingularName}Interface} from '~/types/${lowercaseSingularName}'\n` +
        "import {MAKE_CRUD} from '~/constants/makeCrud.config'" +
        '\n' +
        'export const dataTableTemplatesConst: Array<DataTableTemplate> = [\n' +
        '  /**\n' +
        `   * Colones à modifier dans le datatable des ${lowercasePluralName}\n` +
        "   *  key: string => paramètre de l'entité présent dans la colonne\n" +
        "   *  component: Component => composant remplacant l'affichage de la value\n" +
        '   *  props?: object => props à passer au composant\n' +
        '   *  target?: string => props du composant recevant la value\n' +
        '   *  handlers?: object => emits à passer au composant\n' +
        '   **/\n' +
        '{\n' +
        "    key: 'actions',\n" +
        '    component: AppCrudTableActions,\n' +
        '    handlers: {\n' +
        `    edit: (item: ${capitalizedSingularName}Interface) =>\n` +
        '        useRouter().push(`/' +
        routeName +
        '/${MAKE_CRUD.route.update}/${item.id}`),\n' +
        '    },\n' +
        '    props: {\n' +
        `      deleteItemFunction: (item: ${capitalizedSingularName}Interface) =>\n` +
        '        handleDeleteItem(`/api/' +
        lowercasePluralName +
        '/${item.id}`),\n' +
        `        entity: '${lowercaseName}',\n` +
        '    },\n' +
        '  },\n' +
        ']',
    },
    {
      fileName: 'defaultValue.const.ts',
      content:
        `import type {${capitalizedSingularName}Interface} from '~/types/${lowercaseSingularName}'\n` +
        '\n' +
        'export const defaultValueConst = {\n' +
        '  /**\n' +
        "   * valeur par défaut de l'entité.\n" +
        "   * Ajoutez d'autres valeurs si besoin.\n" +
        '   **/\n' +
        `} //satisfies Omit<${capitalizedSingularName}Interface, 'id'>`,
    },
    {
      fileName: `${formName}.vue`,
      content:
        '<script setup lang="ts">\n' +
        `import type {${capitalizedSingularName}Interface} from '~/types/${lowercaseSingularName}.js'\n` +
        "  import {FORM_VALIDATIONS_RULES} from '~/constants/formValidationsRules.const.js'\n" +
        '\n' +
        '  /** PROPS **/\n' +
        '  interface Props {\n' +
        '    modelValue: unknown\n' +
        '  }\n' +
        '\n' +
        '  const props = defineProps<Props>()\n' +
        '\n' +
        '  /** EMITS **/\n' +
        '  type Emits = {\n' +
        "    'update:modelValue': [\n" +
        `     value: ${capitalizedSingularName}Interface | Omit<${capitalizedSingularName}Interface, 'id'>,\n` +
        '    ]\n' +
        '  }\n' +
        '  const emit = defineEmits<Emits>()\n' +
        '\n' +
        '  /** COMPUTED **/\n' +
        `const ${lowercaseSingularName} = computed({\n` +
        '    get: () =>\n' +
        `     props.modelValue as ${capitalizedSingularName}Interface | Omit<${capitalizedSingularName}Interface, 'id'>,\n` +
        "    set: (value) => emit('update:modelValue', value),\n" +
        '  })\n' +
        '</script>\n' +
        '\n' +
        '<template>\n' +
        '  <v-text-field\n' +
        `    v-model="${lowercaseSingularName}.exemple"\n` +
        '    label="Exemple"\n' +
        '    :rules="[FORM_VALIDATIONS_RULES.required]"\n' +
        '  />\n' +
        `{{${lowercaseSingularName}}}` +
        '</template>\n' +
        '\n' +
        '<style scoped></style>\n',
    },
    {
      fileName: 'titles.const.ts',
      content:
        'export const titles = {\n' +
        `  formTitle: '${capitalizedSingularName}',\n` +
        `tableTitle: 'Gestion des ${lowercasePluralName}',\n` +
        '}',
    },
    {
      fileName: 'index.ts',
      content:
        `import ${formName} from './${formName}.vue'\n` +
        `const FormComponent = ${formName}\n` +
        `export {defaultValueConst} from './defaultValue.const.js'\n` +
        `export {tableHeadersConst} from './tableHeaders.const.js'\n` +
        `export {titles} from './titles.const.js'\n` +
        `export {dataTableTemplatesConst} from './dataTableTemplates.const.js'\n` +
        'export {FormComponent}\n' +
        `export const route = "${lowercaseName}"`,
    },

    // Ajoutez d'autres fichiers d'entité si nécessaire
  ]
}
