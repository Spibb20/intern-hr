import { notFound } from "next/navigation";
import { ControlBar } from "@/components/control-bar";
import {
  ConfigManager,
  type FieldDef,
} from "@/components/configuration/config-manager";
import { CONFIG_DEFS } from "@/lib/config-defs";
import { getConfigRows, getFormOptions } from "@/lib/data/queries";

export const dynamic = "force-dynamic";

export default async function ConfigurationPage({
  params,
}: {
  params: Promise<{ model: string }>;
}) {
  const { model } = await params;
  const def = CONFIG_DEFS[model];
  if (!def) notFound();

  const [rows, options] = await Promise.all([
    getConfigRows(model),
    getFormOptions(),
  ]);
  const relatedLabels: Record<string, Record<string, string>> = {};
  const fields: FieldDef[] = def.fields.map((field) => {
    if (field.type === "select" && field.optionsKey) {
      const fieldOptions = options[field.optionsKey] ?? [];
      relatedLabels[field.key] = Object.fromEntries(
        fieldOptions.map((option) => [option.id, option.name])
      );
      return {
        key: field.key,
        label: field.label,
        type: field.type,
        required: field.required,
        placeholder: field.placeholder,
        options: fieldOptions,
      };
    }
    return {
      key: field.key,
      label: field.label,
      type: field.type,
      required: field.required,
      placeholder: field.placeholder,
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
