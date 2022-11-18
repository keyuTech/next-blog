import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useCallback,
  useState,
} from "react";

interface useFormProps<T> {
  options: {
    initFormData: T;
    fields: Array<{
      label: string;
      type: "text" | "password" | "textarea";
      key: keyof T;
    }>;
    buttons: ReactElement[];
    submit: {
      request: (formData: T) => Promise<AxiosResponse<T>>;
      success: () => void
    };
  };
}

export function useForm<T extends Record<string, string | number>>({
  options,
}: useFormProps<T>) {
  const { initFormData, fields, buttons, submit } = options;
  const router = useRouter()
  
  const [formData, setFormData] = useState<T>(initFormData);
  const [errors, setErrors] = useState(() => {
    const errors: { [key in keyof T]?: string[] } = {};
    for (let key in initFormData) {
      if (initFormData instanceof Object && initFormData.hasOwnProperty(key)) {
        errors[key] = [];
      }
    }
    return errors;
  });

  const onChange = useCallback(
    (key: keyof T, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [key]: e.target.value });
    },
    [formData]
  );

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      submit.request(formData).then(
        submit.success,
        (error) => {
          const response: AxiosResponse = error.response
          if (response) {
            if (response.status === 422) {
              setErrors(response.data)
            } else if (response.status === 401) {
              router.push({
                pathname: '/sign_in',
                query: {return_to: encodeURIComponent(router.pathname)}
              })
            }
          }
        }
      );
    },
    [formData]
  );

  const form = (
    <form onSubmit={onSubmit}>
      {fields.map((field) => (
        <div key={field.key.toString()} className={'mt-4'}>
          <label>
            {field.label}
            {field.type === "textarea" ? (
              <textarea
                className={"bg-slate-100"}
                onChange={(e) => onChange(field.key, e)}
                value={formData[field.key]}
              />
            ) : (
              <input
                className={"bg-slate-100"}
                type={field.type}
                value={formData[field.key]}
                onChange={(e) => onChange(field.key, e)}
              />
            )}
          </label>
          <p>{errors[field.key]?.[0]}</p>
        </div>
      ))}
      <div>{buttons}</div>
    </form>
  );
  return {
    form,
  };
}
