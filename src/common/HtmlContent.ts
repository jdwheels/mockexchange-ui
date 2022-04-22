import {
  createElement, HTMLProps, memo, useCallback, useEffect, useState,
} from 'react';
import sanitizeHtml, { IOptions } from 'sanitize-html';

const defaultOptions: IOptions = {

};

interface HtmlContentProps<T extends keyof HTMLElementTagNameMap>
  extends HTMLProps<HTMLElementTagNameMap[T]> {
  element?: T
  children: string;
  sanitizeOptions?: IOptions
}

const HtmlContentImpl = function<T extends keyof HTMLElementTagNameMap> (
  props: HtmlContentProps<T>,
) {
  const {
    element = 'div',
    children,
    sanitizeOptions,
    ...elementProps
  } = props;
  // const [resolvedOptions, setResolvedOptions] = useState<IOptions>(defaultOptions);

  const handleSanitize = useCallback((c: string) => {
    console.log('sanitizing...', c);
    return sanitizeHtml(c, {
      ...defaultOptions,
      ...sanitizeOptions,
    });
  }, [sanitizeOptions]);

  const [sanitized, setSanitized] = useState('');

  useEffect(() => {
    setSanitized(handleSanitize(children));
  }, [handleSanitize, children]);

  useEffect(() => {
    console.log({ sanitized });
  }, [sanitized]);

  console.log({ content: children });

  return createElement(element, {
    dangerouslySetInnerHTML: {
      __html: sanitized,
    },
    ...elementProps,
  });
};

HtmlContentImpl.defaultProps = {
  element: 'div',
  sanitizeOptions: {},
};

export const HtmlContent = memo(HtmlContentImpl);
