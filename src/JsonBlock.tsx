import React, { FC } from 'react';
import PropTypes from 'prop-types';

interface JsonBlockProps {
  json: Record<string, unknown>;
}

const JsonBlock: FC<JsonBlockProps> = function ({ json }) {
  return (
    <pre>
      <code className="x">
        {JSON.stringify(json, null, 2)}
      </code>
    </pre>
  );
};

JsonBlock.propTypes = {
  json: PropTypes.shape({}).isRequired,
};

export default JsonBlock;
