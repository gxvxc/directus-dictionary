import Dictionary from "./dictionary.vue";

export default {
  id: "dictionary",
  name: "Dictionary",
  description: "Enter values in a predifined list",
  icon: "note_add",
  component: Dictionary,
  types: ["json"],
  options: [
    {
      field: "dictionary",
      type: "json",
      name: "Dictionary",
      meta: {
        width: "full",
        interface: "repeater",
        options: {
          template: "{{ key }}",
          fields: [
            {
              field: "key",
              type: "string",
              name: "Key",
              meta: {
                interface: "text-input",
                options: {
                  placeholder: "Add key..."
                }
              }
            },
            {
              field: "description",
              type: "text",
              name: "Description",
              meta: {
                interface: "textarea",
                options: {
                  placeholder: "Add description..."
                }
              }
            }
          ]
        }
      }
    }
  ]
};
