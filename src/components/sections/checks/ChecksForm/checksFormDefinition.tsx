import {
  FlattenKeys,
  IFormDefinition,
} from "@/components/shared/RHFFormBuilder/types";
import { ChecksFormPayload } from "./ChecksFormPayload";
import { UseFormSetValue } from "react-hook-form";

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
export const getChecksFormDefinition = ({
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
  setValue: UseFormSetValue<ChecksFormPayload>;
}) => {
  const baseDefinition: IFormDefinition<FlattenKeys<ChecksFormPayload>> = [
    {
      type: "typography",
      label: "Request",
      id: "request",
      name: "request",
      className: "col-span-12 mt-4",
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
        <input
          id="checkbox-subject"
          name="checkbox-subject"
          checked={presence["subject"]}
          onChange={(e) => {
            if (e.target.checked) {
              setValue(
                "subject",
                {
                  type: "",
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
              setValue("subject", null, { shouldValidate: false });
            }
          }}
          type="checkbox"
          className="my-auto ml-4 w-4 rounded text-fuchsia-500 focus:ring-fuchsia-500 bg-zinc-800 border-gray-900"
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
        "col-span-12 grid grid-cols-12 gap-x-2 gap-y-8 sm:gap-8",
      options: [
        { label: "user", value: "user" },
        { label: "role-actor", value: "role-actor" },
        { label: "twin-actor", value: "twin-actor" },
      ],
      disabled: !presence["subject"],
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
      className: "col-span-12 md:mt-4",
      inputProps: {
        className: "text-md font-medium text-white",
      },
      visible: true,
      group: `resource`,
      groupClassName:
        "col-span-12 md:col-span-6 flex flex-col gap-8 md:pr-4 md:border-r border-white/10",
      parentGroup: "resource_action",
      parentGroupClassName:
        "grid grid-cols-12 gap-x-2 gap-y-4 gap-x-0 col-span-12",
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
      group: `resource`,
      parentGroup: "resource_action",
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
    },
    {
      type: "typography",
      label: "Action",
      id: "action",
      name: "action",
      className: "col-span-12 mt-4",
      inputProps: {
        className: "text-md font-medium text-white",
      },
      visible: true,
      group: `action`,
      groupClassName:
        "col-span-12 md:col-span-6 flex flex-col mt-4 md:mt-0 gap-8 md:pl-4 border-white/10 border-t md:border-none",
      parentGroup: "resource_action",
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
              parentGroupClassName: `p-4 border rounded-md grid transition-[height] duration-150 h-18 grid-cols-12 gap-x-2 gap-y-4 gap-x-0 col-span-12 relative relative overflow-hidden ${
                borderClasses[index % 10]
              } ${
                expandedSectionIndex === index ? "h-[1752px] md:h-[1184px]" : ""
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
                "col-span-12 md:col-span-6 flex flex-col gap-8 md:pr-4",
              parentGroup: `evaluations[${index}]`,
              options: [
                { label: "user", value: "user" },
                { label: "role-actor", value: "role-actor" },
                { label: "twin-actor", value: "twin-actor" },
              ],
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
              groupClassName: "col-span-12 md:col-span-6 md:pl-4",
              group: `evaluations[${index}].subject_right_column`,
              parentGroup: `evaluations[${index}]`,
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
              className: "col-span-12 md:mt-4",
              inputProps: {
                className: "text-md font-medium text-white",
              },
              visible: true,
              parentGroup: `evaluations[${index}]`,
              group: `evaluations[${index}].resource`,
              groupClassName:
                "col-span-12 md:col-span-6 flex flex-col gap-8 md:pr-4 md:border-r border-white/10",
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
            },
            {
              type: "typography",
              label: "Action",
              id: "action",
              name: "action",
              className: "col-span-12 mt-4",
              inputProps: {
                className: "text-md font-medium text-white",
              },
              visible: true,
              parentGroup: `evaluations[${index}]`,
              group: `evaluations[${index}].action`,
              groupClassName:
                "col-span-12 md:col-span-6 flex flex-col mt-4 md:mt-0 gap-8 md:pl-4 border-white/10 border-t md:border-none",
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
            },
            {
              type: "code",
              requiredFieldSymbol: true,
              name: `evaluations[${index}].context`,
              id: `evaluations[${index}].context`,
              labelId: `evaluations[${index}].context`,
              visible: true,
              className: "col-span-12",
              parentGroup: `evaluations[${index}]`,
              height: "200px",
              language: "json",
            },
          ] as IFormDefinition<FlattenKeys<ChecksFormPayload>>
      )
      .flat(2),
  ];
  return baseDefinition;
};
