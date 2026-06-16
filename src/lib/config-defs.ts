import type { ConfigModel } from "@/lib/types";
import type { FieldType } from "@/components/configuration/config-manager";

// Static metadata describing each configuration list model: its page title and
// the form fields it exposes. Adding a new config model is as simple as adding
// an entry here plus a collection in the store / actions.

export interface ConfigFieldMeta {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  // For select fields, which set of options to inject from form options.
  optionsKey?: "departments";
  placeholder?: string;
}

export interface ConfigDef {
  model: ConfigModel;
  title: string;
  fields: ConfigFieldMeta[];
}

export const CONFIG_DEFS: Record<ConfigModel, ConfigDef> = {
  "job-positions": {
    model: "job-positions",
    title: "Job Positions",
    fields: [
      {
        key: "name",
        label: "Job Position",
        type: "text",
        required: true,
        placeholder: "e.g. Sales Manager",
      },
      {
        key: "departmentId",
        label: "Department",
        type: "select",
        optionsKey: "departments",
      },
    ],
  },
  "employee-types": {
    model: "employee-types",
    title: "Employee Types",
    fields: [
      {
        key: "name",
        label: "Name",
        type: "text",
        required: true,
        placeholder: "e.g. Employee",
      },
    ],
  },
  "work-locations": {
    model: "work-locations",
    title: "Work Locations",
    fields: [
      {
        key: "name",
        label: "Work Location",
        type: "text",
        required: true,
        placeholder: "e.g. Building A",
      },
      {
        key: "address",
        label: "Address",
        type: "text",
        placeholder: "Street, City",
      },
    ],
  },
  tags: {
    model: "tags",
    title: "Employee Tags",
    fields: [
      {
        key: "name",
        label: "Tag Name",
        type: "text",
        required: true,
        placeholder: "e.g. Founder",
      },
      { key: "color", label: "Color", type: "color" },
    ],
  },
  "departure-reasons": {
    model: "departure-reasons",
    title: "Departure Reasons",
    fields: [
      {
        key: "name",
        label: "Reason",
        type: "text",
        required: true,
        placeholder: "e.g. Resigned",
      },
    ],
  },
};

export const CONFIG_MODELS = Object.keys(CONFIG_DEFS) as ConfigModel[];
