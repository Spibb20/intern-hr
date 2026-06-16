import { notFound } from "next/navigation";
import { ControlBar } from "@/components/control-bar";
import {
  ConfigManager,
  type FieldDef,
} from "@/components/configuration/config-manager";
import { CONFIG_DEFS } from "@/lib/config-defs";
import { getConfigRows, getFormOptions } from "@/lib/data/queries";
import type { ConfigModel } from "@/lib/types";

function isConfigModel(value: string): value is ConfigModel {
  return value in CONFIG_DEFS;
}

export default async function ConfigurationPage({
  params,
}: {
  params: Promise<{ model: string }>;
}) {
  const { model } = await params;
  if (!isConfigModel(model)) notFound();

  const def = CONFIG_DEFS[model];
  const rows = getConfigRows(model);
  const options = getFormOptions();

  // Build the field list, injecting select options and related-name maps.
  const relatedLabels: Record<string, Record<string, string>> = {};
  const fields: FieldDef[] = def.fields.map((f) => {
    if (f.type === "select" && f.optionsKey) {
      const opts = options[f.optionsKey];
      relatedLabels[f.key] = Object.fromEntries(
        opts.map((o) => [o.id, o.name])
      );
      return {
        key: f.key,
        label: f.label,
        type: f.type,
        required: f.required,
        placeholder: f.placeholder,
        options: opts,
      };
    }
    return {
      key: f.key,
      label: f.label,
      type: f.type,
      required: f.required,
      placeholder: f.placeholder,
    };
  });

  return (
    <div className="flex flex-col">
      <ControlBar
        title={def.title}
        total={rows.length}
        searchable={false}
        showGear
      />
      <ConfigManager
        model={model}
        rows={rows}
        fields={fields}
        relatedLabels={relatedLabels}
      />
    </div>
  );
}
