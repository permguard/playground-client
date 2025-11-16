import {
  FlattenKeys,
  IFormDefinition,
} from "@/components/shared/RHFFormBuilder/types";
import { EvaluationsFormPayload } from "./EvaluationsFormPayload";
import { UseFormSetValue } from "react-hook-form";
import { SwitchInput } from "@/components/shared/RHFFormBuilder/Switch";

const borderClasses = [
  "border-[#FFA07A]",
  "border-[#87CEFA]",
  "border-[#FDFBD4]",
  "border-[#90EE90]",
  "border-[#E9749F]",
  "border-[#6D5ACF]",
  "border-[#99F2C4]",
  "border-[#F0E68C]",
  "border-[#00CDDD]",
  "border-[#D395FF]",
];
export const getEvaluationsFormDefinition = ({
  addEvaluationBtn,
  removeEvaluationBtn,
  evaluationsCount,
  expandedSectionIndex,
  presence,
  setValue,
}: {
  addEvaluationBtn: React.ReactNode;
  removeEvaluationBtn: (index: number) => React.ReactNode;
  expandedSectionIndex: number | null;
  evaluationsCount: number;
  presence: { [key: string]: boolean };
  setValue: UseFormSetValue<EvaluationsFormPayload>;
}) => {
  const baseDefinition: IFormDefinition<FlattenKeys<EvaluationsFormPayload>> = [
    {
      type: "typography",
      label: "Request",
      id: "request",
      name: "request",
      className: "col-span-12",
      inputProps: {
        className: "text-md font-medium text-white",
      },
      visible: true,
    },
    {
      type: "textfield",
      icon: "mdi:identifier",
      requiredFieldSymbol: true,
      name: "request_id",
      id: "request_id",
      label: "Request ID",
      labelId: "request_id",
      visible: true,
      className: "col-span-12 md:col-span-6",
    },
    {
      type: "typography",
      label: "",
      id: `separator_1`,
      name: `separator_1`,
      className: "col-span-12 border-t border-white/10",
      inputProps: {
        className: "text-md font-medium text-white",
      },
      visible: true,
    },
    {
      type: "typography",
      label: "Subject",
      id: "subject",
      name: "subject",
      className: "col-span-12",
      inputProps: {
        className: "text-md font-medium text-white",
      },
      visible: true,
      additionalContent: (
        <SwitchInput
          id="checkbox-subject"
          name="checkbox-subject"
          checked={presence["subject"]}
          onChange={(checked) => {
            if (checked) {
              setValue(
                "subject",
                {
                  type: "user",
                  id: "",
                  source: "",
                  properties: "{}",
                },
                { shouldValidate: true }
              );
            } else {
              setValue("subject.type", null);
              setValue("subject.id", null);
              setValue("subject.source", null);
              setValue("subject.properties", null);
              setValue("subject", null, { shouldValidate: true });
            }
          }}
        />
      ),
    },
    {
      type: "select",
      icon: "mdi:format-list-bulleted-type",
      requiredFieldSymbol: true,
      name: "subject.type",
      id: "subject.type",
      label: "Type",
      labelId: "subject.type",
      visible: true,
      group: "subject_left_column",
      groupClassName: "col-span-12 md:col-span-6 flex flex-col gap-8",
      parentGroup: "subject",
      parentGroupClassName:
        "col-span-12 grid grid-cols-12 gap-x-2 gap-y-8 sm:gap-8 relative p-4",
      options: [
        { label: "user", value: "user" },
        { label: "workload", value: "workload" }
      ],
      disabled: !presence["subject"],
      additionalContent: presence["subject"] ? null : (
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-zinc-600/30 z-20"></div>
      ),
    },
    {
      type: "textfield",
      icon: "mdi:identifier",
      requiredFieldSymbol: true,
      name: "subject.id",
      id: "subject.id",
      label: "ID",
      labelId: "subject.id",
      visible: true,
      group: "subject_left_column",
      parentGroup: "subject",
      disabled: !presence["subject"],
    },
    {
      type: "textfield",
      icon: "mdi:database",
      requiredFieldSymbol: true,
      name: "subject.source",
      id: "subject.source",
      label: "Source",
      labelId: "subject.source",
      visible: true,
      group: "subject_left_column",
      parentGroup: "subject",
      disabled: !presence["subject"],
    },
    {
      type: "code",
      name: "subject.properties",
      id: "subject.properties",
      requiredFieldSymbol: true,
      label: "Properties",
      labelId: "subject.properties",
      height: "200px",
      language: "json",
      visible: true,
      groupClassName: "col-span-12 md:col-span-6",
      group: "subject_right_column",
      parentGroup: "subject",
      disabled: !presence["subject"],
    },
    {
      type: "typography",
      label: "",
      id: `separator_2`,
      name: `separator_2`,
      className: "col-span-12 border-t border-white/10",
      inputProps: {
        className: "text-md font-medium text-white",
      },
      visible: true,
    },
    {
      type: "typography",
      label: "Resource",
      id: `resource`,
      name: `resource`,
      className: "col-span-12 -ml-4 md:-ml-2 md:mt-4",
      inputProps: {
        className: "text-md font-medium text-white",
      },
      visible: true,
      group: `resource`,
      groupClassName:
        "col-span-12 md:col-span-6 flex flex-col gap-8 md:pr-4 md:border-r border-white/10 relative p-4 pt-0",
      parentGroup: "resource_action",
      parentGroupClassName:
        "grid grid-cols-12 gap-x-0 gap-y-4 gap-x-0 col-span-12",
      additionalContent: (
        <SwitchInput
          id="checkbox-resource"
          name="checkbox-resource"
          checked={presence["resource"]}
          onChange={(checked) => {
            if (checked) {
              setValue(
                "resource",
                {
                  type: "",
                  id: "",
                  properties: "{}",
                },
                { shouldValidate: true }
              );
            } else {
              setValue("resource.type", null);
              setValue("resource.id", null);
              setValue("resource.properties", null);
              setValue("resource", null, { shouldValidate: true });
            }
          }}
        />
      ),
    },
    {
      type: "textfield",
      icon: "mdi:format-list-bulleted-type",
      requiredFieldSymbol: true,
      name: `resource.type`,
      id: `resource.type`,
      label: "Type",
      labelId: `resource.type`,
      visible: true,
      parentGroup: "resource_action",
      disabled: !presence["resource"],
      group: `resource`,
      className: "col-span-12 md:col-span-6 mt-4 md:mt-0",
      additionalContent: presence["resource"] ? null : (
        <div className="absolute left-0 right-0 top-14 md:top-13 bottom-0 bg-zinc-600/30 z-20"></div>
      ),
    },
    {
      type: "textfield",
      icon: "mdi:identifier",
      requiredFieldSymbol: true,
      name: `resource.id`,
      id: `resource.id`,
      label: "ID",
      labelId: `resource.id`,
      visible: true,
      group: `resource`,
      parentGroup: "resource_action",
      disabled: !presence["resource"],
    },
    {
      type: "code",
      name: `resource.properties`,
      id: `resource.properties`,
      requiredFieldSymbol: true,
      label: "Properties",
      labelId: `resource.properties`,
      height: "200px",
      language: "json",
      visible: true,
      group: `resource`,
      className: "col-span-12 md:col-span-6 md:mt-auto",
      parentGroup: "resource_action",
      disabled: !presence["resource"],
    },
    {
      type: "typography",
      label: "Action",
      id: "action",
      name: "action",
      className: "col-span-12 my-4 md:my-0 -ml-4 md:-ml-2",
      inputProps: {
        className: "text-md font-medium text-white",
      },
      visible: true,
      group: `action`,
      groupClassName:
        "col-span-12 mt-4 md:mt-0 md:col-span-6 flex flex-col gap-8 md:pr-4 relative p-4 border-white/10 border-t md:border-none",
      parentGroup: "resource_action",
      additionalContent: (
        <SwitchInput
          id="checkbox-action"
          name="checkbox-action"
          checked={presence["action"]}
          onChange={(checked) => {
            if (checked) {
              setValue(
                "action",
                {
                  name: "",
                  properties: "{}",
                },
                { shouldValidate: true }
              );
            } else {
              setValue("action.name", null);
              setValue("action.properties", null);
              setValue("action", null, { shouldValidate: true });
            }
          }}
        />
      ),
    },
    {
      type: "textfield",
      icon: "icon-park-outline:edit-name",
      requiredFieldSymbol: true,
      name: `action.name`,
      id: `action.name`,
      label: "Name",
      labelId: `action.name`,
      visible: true,
      group: `action`,
      parentGroup: "resource_action",
      disabled: !presence["action"],
      additionalContent: presence["action"] ? null : (
        <div className="absolute left-0 right-0 top-22 md:top-13 bottom-0 bg-zinc-600/30 z-20"></div>
      ),
    },
    {
      type: "code",
      name: `action.properties`,
      id: `action.properties`,
      requiredFieldSymbol: true,
      label: "Properties",
      labelId: `action.properties`,
      height: "200px",
      language: "json",
      visible: true,
      group: `action`,
      className: "col-span-12 mt-auto",
      parentGroup: "resource_action",
      disabled: !presence["action"],
    },
    {
      type: "typography",
      label: "",
      id: `separator_3`,
      name: `separator_3`,
      className: "col-span-12 border-t border-white/10",
      inputProps: {
        className: "text-md font-medium text-white",
      },
      visible: true,
    },
    {
      type: "typography",
      label: "Context",
      id: "context-label",
      name: "context-label",
      className: "col-span-12",
      inputProps: {
        className: "text-md font-medium text-white",
      },
      visible: true,

      additionalContent: (
        <SwitchInput
          id="checkbox-context"
          name="checkbox-context"
          checked={presence["context"]}
          onChange={(checked) => {
            if (checked) {
              setValue("context", "{}", { shouldValidate: true });
            } else {
              setValue("context", null, { shouldValidate: true });
            }
          }}
        />
      ),
    },
    {
      type: "code",
      requiredFieldSymbol: true,
      name: "context",
      id: "context",
      labelId: "context",
      visible: true,
      className: "col-span-12",
      parentGroup: "context",
      height: "200px",
      language: "json",
      disabled: !presence["context"],
      additionalContent: presence["context"] ? null : (
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-zinc-600/30 z-20"></div>
      ),
      parentGroupClassName:
        "grid grid-cols-12 gap-x-2 gap-y-4 gap-x-0 col-span-12 relative p-4",
    },
    {
      type: "typography",
      label: "Evaluations",
      id: "evaluations",
      name: "evaluations",
      className: "col-span-12 flex gap-12 mt-4",
      inputProps: {
        className: "text-md font-medium text-white",
      },
      visible: true,
      additionalContent: addEvaluationBtn,
    },
    ...Array.from({ length: evaluationsCount })
      .map(
        (_, index) =>
          [
            {
              type: "textfield",
              icon: "mdi:identifier",
              requiredFieldSymbol: true,
              name: `evaluations[${index}].request_id`,
              id: `evaluations[${index}].request_id`,
              label: "Request ID",
              labelId: `evaluations[${index}].request_id`,
              visible: true,
              parentGroup: `evaluations[${index}]`,
              parentGroupClassName: `p-4 border rounded-md grid transition-[height] duration-150 h-18 grid-cols-12 gap-x-0 gap-y-4 gap-x-0 col-span-12 relative relative overflow-hidden ${
                borderClasses[index % 10]
              } ${
                expandedSectionIndex === index ? "h-[1856px] md:h-[1229px]" : ""
              } `,
              group: `evaluations[${index}].request_id`,
              groupClassName:
                "col-span-12 grid grid-cols-12 gap-x-2 gap-y-8 sm:gap-8 md:pr-4",
              additionalContent: removeEvaluationBtn(index),
              className:
                "col-span-12 md:col-span-6 flex flex-col-reverse max-w-[80%] md:max-w-[100%]",
            },
            {
              type: "typography",
              label: "Subject",
              id: `evaluations[${index}].subject`,
              name: `evaluations[${index}].subject`,
              className: "col-span-12 border-t border-white/10 pt-4 h-10 mt-2",
              inputProps: {
                className: "text-md font-medium text-white",
              },
              visible: true,
              parentGroup: `evaluations[${index}]`,
              additionalContent: (
                <SwitchInput
                  id={`evaluations[${index}]-subject`}
                  name={`evaluations[${index}]-subject`}
                  checked={presence[`evaluations[${index}].subject`]}
                  onChange={(checked) => {
                    if (checked) {
                      setValue(
                        `evaluations[${index}].subject` as keyof EvaluationsFormPayload,
                        {
                          type: "user",
                          id: "",
                          source: "",
                          properties: "{}",
                        },
                        { shouldValidate: true }
                      );
                    } else {
                      setValue(
                        `evaluations[${index}].subject.type` as keyof EvaluationsFormPayload,
                        null
                      );
                      setValue(
                        `evaluations[${index}].subject.id` as keyof EvaluationsFormPayload,
                        null
                      );
                      setValue(
                        `evaluations[${index}].subject.source` as keyof EvaluationsFormPayload,
                        null
                      );
                      setValue(
                        `evaluations[${index}].subject.properties` as keyof EvaluationsFormPayload,
                        null
                      );
                      setValue(
                        `evaluations[${index}].subject` as keyof EvaluationsFormPayload,
                        null,
                        {
                          shouldValidate: true,
                        }
                      );
                    }
                  }}
                />
              ),
            },
            {
              type: "select",
              icon: "mdi:format-list-bulleted-type",
              requiredFieldSymbol: true,
              name: `evaluations[${index}].subject.type`,
              id: `evaluations[${index}].subject.type`,
              label: "Type",
              labelId: `evaluations[${index}].subject.type`,
              visible: true,
              group: `evaluations[${index}].subject_left_column`,
              groupClassName:
                "col-span-12 md:col-span-6 flex flex-col gap-8 md:pr-4 relative p-4",
              parentGroup: `evaluations[${index}]`,
              options: [
                { label: "user", value: "user" },
                { label: "workload", value: "workload" },
              ],
              disabled: !presence[`evaluations[${index}].subject`],
              additionalContent: presence[
                `evaluations[${index}].subject`
              ] ? null : (
                <div className="absolute left-0 right-0 top-0 bottom-0 bg-zinc-600/30 z-20"></div>
              ),
            },
            {
              type: "textfield",
              icon: "mdi:identifier",
              requiredFieldSymbol: true,
              name: `evaluations[${index}].subject.id`,
              id: `evaluations[${index}].subject.id`,
              label: "ID",
              labelId: `evaluations[${index}].subject.id`,
              visible: true,
              group: `evaluations[${index}].subject_left_column`,
              parentGroup: `evaluations[${index}]`,
              disabled: !presence[`evaluations[${index}].subject`],
            },
            {
              type: "textfield",
              icon: "mdi:database",
              requiredFieldSymbol: true,
              name: `evaluations[${index}].subject.source`,
              id: `evaluations[${index}].subject.source`,
              label: "Source",
              labelId: `evaluations[${index}].subject.source`,
              visible: true,
              group: `evaluations[${index}].subject_left_column`,
              parentGroup: `evaluations[${index}]`,
              disabled: !presence[`evaluations[${index}].subject`],
            },
            {
              type: "code",
              name: `evaluations[${index}].subject.properties`,
              id: `evaluations[${index}].subject.properties`,
              requiredFieldSymbol: true,
              label: "Properties",
              labelId: `evaluations[${index}].subject.properties`,
              height: "200px",
              language: "json",
              visible: true,
              groupClassName:
                "col-span-12 md:col-span-6 md:pl-4 relative p-4 pt-4 md:pt-0 -mt-4 md:mt-0",
              group: `evaluations[${index}].subject_right_column`,
              parentGroup: `evaluations[${index}]`,
              disabled: !presence[`evaluations[${index}].subject`],
              additionalContent: presence[
                `evaluations[${index}].subject`
              ] ? null : (
                <div className="absolute left-0 right-0 top-0 bottom-0 bg-zinc-600/30 z-20"></div>
              ),
            },
            {
              type: "typography",
              label: "",
              id: `evaluations[${index}].separator_1`,
              name: `evaluations[${index}].separator_1`,
              className: "col-span-12 border-t border-white/10 pt-2 mt-2",
              inputProps: {
                className: "text-md font-medium text-white",
              },
              visible: true,
              parentGroup: `evaluations[${index}]`,
            },
            {
              type: "typography",
              label: "Resource",
              id: `evaluations[${index}].resource`,
              name: `evaluations[${index}].resource`,
              className: "col-span-12 -mt-4 -ml-4 md:mt-0",
              inputProps: {
                className: "text-md font-medium text-white",
              },
              visible: true,
              parentGroup: `evaluations[${index}]`,
              group: `evaluations[${index}].resource`,
              groupClassName:
                "col-span-12 md:col-span-6 flex flex-col gap-8 md:pr-4 md:border-r border-white/10 relative p-4",
              additionalContent: (
                <SwitchInput
                  name={`evaluations[${index}].resource`}
                  checked={presence[`evaluations[${index}].resource`]}
                  onChange={(checked) => {
                    if (checked) {
                      setValue(
                        `evaluations[${index}].resource` as keyof EvaluationsFormPayload,
                        {
                          type: "",
                          id: "",
                          properties: "{}",
                        },
                        { shouldValidate: true }
                      );
                    } else {
                      setValue(
                        `evaluations[${index}].resource.type` as keyof EvaluationsFormPayload,
                        null
                      );
                      setValue(
                        `evaluations[${index}].resource.id` as keyof EvaluationsFormPayload,
                        null
                      );
                      setValue(
                        `evaluations[${index}].resource.properties` as keyof EvaluationsFormPayload,
                        null
                      );
                      setValue(
                        `evaluations[${index}].resource` as keyof EvaluationsFormPayload,
                        null,
                        {
                          shouldValidate: true,
                        }
                      );
                    }
                  }}
                />
              ),
            },
            {
              type: "textfield",
              icon: "mdi:format-list-bulleted-type",
              requiredFieldSymbol: true,
              name: `evaluations[${index}].resource.type`,
              id: `evaluations[${index}].resource.type`,
              label: "Type",
              labelId: `evaluations[${index}].resource.type`,
              visible: true,
              group: `evaluations[${index}].resource`,
              parentGroup: `evaluations[${index}]`,
              disabled: !presence[`evaluations[${index}].resource`],
              additionalContent: presence[
                `evaluations[${index}].resource`
              ] ? null : (
                <div className="absolute left-0 right-0 top-10 md:top-14 bottom-0 bg-zinc-600/30 z-20"></div>
              ),
            },
            {
              type: "textfield",
              icon: "mdi:identifier",
              requiredFieldSymbol: true,
              name: `evaluations[${index}].resource.id`,
              id: `evaluations[${index}].resource.id`,
              label: "ID",
              labelId: `evaluations[${index}].resource.id`,
              visible: true,
              group: `evaluations[${index}].resource`,
              parentGroup: `evaluations[${index}]`,
              disabled: !presence[`evaluations[${index}].resource`],
            },
            {
              type: "code",
              name: `evaluations[${index}].resource.properties`,
              id: `evaluations[${index}].resource.properties`,
              requiredFieldSymbol: true,
              label: "Properties",
              labelId: `evaluations[${index}].resource.properties`,
              height: "200px",
              language: "json",
              visible: true,
              group: `evaluations[${index}].resource`,
              parentGroup: `evaluations[${index}]`,
              className: "col-span-12 md:col-span-6 md:mt-auto",
              disabled: !presence[`evaluations[${index}].resource`],
            },
            {
              type: "typography",
              label: "Action",
              id: "action",
              name: "action",
              className: "col-span-12 mt-2 -ml-4 md:-ml-2 md:mt-0",
              inputProps: {
                className: "text-md font-medium text-white",
              },
              visible: true,
              parentGroup: `evaluations[${index}]`,
              group: `evaluations[${index}].action`,
              groupClassName:
                "col-span-12 md:col-span-6 flex flex-col mt-2 md:mt-0 gap-8 md:pl-4 border-white/10 border-t md:border-none relative p-4",
              additionalContent: (
                <SwitchInput
                  name={`evaluations[${index}].action`}
                  checked={presence[`evaluations[${index}].action`]}
                  onChange={(checked) => {
                    if (checked) {
                      setValue(
                        `evaluations[${index}].action` as keyof EvaluationsFormPayload,
                        {
                          name: "",
                          properties: "{}",
                        },
                        { shouldValidate: true }
                      );
                    } else {
                      setValue(
                        `evaluations[${index}].action.name` as keyof EvaluationsFormPayload,
                        null
                      );
                      setValue(
                        `evaluations[${index}].action.properties` as keyof EvaluationsFormPayload,
                        null
                      );
                      setValue(
                        `evaluations[${index}].action` as keyof EvaluationsFormPayload,
                        null,
                        {
                          shouldValidate: true,
                        }
                      );
                    }
                  }}
                />
              ),
            },
            {
              type: "textfield",
              icon: "icon-park-outline:edit-name",
              requiredFieldSymbol: true,
              name: `evaluations[${index}].action.name`,
              id: `evaluations[${index}].action.name`,
              label: "Name",
              labelId: `evaluations[${index}].action.name`,
              visible: true,
              parentGroup: `evaluations[${index}]`,
              group: `evaluations[${index}].action`,
              disabled: !presence[`evaluations[${index}].action`],
              additionalContent: presence[
                `evaluations[${index}].action`
              ] ? null : (
                <div className="absolute left-0 right-0 top-16 md:top-14 bottom-0 bg-zinc-600/30 z-20"></div>
              ),
            },
            {
              type: "code",
              name: `evaluations[${index}].action.properties`,
              id: `evaluations[${index}].action.properties`,
              requiredFieldSymbol: true,
              label: "Properties",
              labelId: `evaluations[${index}].action.properties`,
              height: "200px",
              language: "json",
              visible: true,
              parentGroup: `evaluations[${index}]`,
              group: `evaluations[${index}].action`,
              className: "col-span-12 mt-auto",
              disabled: !presence[`evaluations[${index}].action`],
            },
            {
              type: "typography",
              label: "Context",
              id: `evaluations[${index}].context-label`,
              name: `evaluations[${index}].context-label`,
              className: "col-span-12 border-t border-white/10 pt-4 h-10 mt-2",
              parentGroup: `evaluations[${index}]`,
              inputProps: {
                className: "text-md font-medium text-white",
              },
              visible: true,
              additionalContent: (
                <SwitchInput
                  name={
                    `evaluations[${index}].context` as keyof EvaluationsFormPayload
                  }
                  checked={presence[`evaluations[${index}].context`]}
                  onChange={(checked) => {
                    if (checked) {
                      setValue(
                        `evaluations[${index}].context` as keyof EvaluationsFormPayload,
                        "{}",
                        {
                          shouldValidate: true,
                        }
                      );
                    } else {
                      setValue(
                        `evaluations[${index}].context` as keyof EvaluationsFormPayload,
                        null,
                        {
                          shouldValidate: true,
                        }
                      );
                    }
                  }}
                />
              ),
            },
            {
              type: "code",
              requiredFieldSymbol: true,
              name: `evaluations[${index}].context`,
              id: `evaluations[${index}].context`,
              labelId: `evaluations[${index}].context`,
              visible: true,
              className: "col-span-12 relative p-4",
              parentGroup: `evaluations[${index}]`,
              height: "200px",
              language: "json",
              disabled: !presence[`evaluations[${index}].context`],
              additionalContent: presence[
                `evaluations[${index}].context`
              ] ? null : (
                <div className="absolute left-0 right-0 top-0 bottom-0 bg-zinc-600/30 z-20"></div>
              ),
            },
          ] as IFormDefinition<FlattenKeys<EvaluationsFormPayload>>
      )
      .flat(2),
  ];
  return baseDefinition;
};
