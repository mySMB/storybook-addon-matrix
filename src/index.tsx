import * as React from 'react';
import { makeDecorator } from '@storybook/addons';
import { Matrix } from './components/Matrix';
import { Box } from './components/Box';
import { Error } from './components/Error';
import { getParameters } from './services/getParameters';

export const withMatrix = makeDecorator({
  name: 'withMatrix',
  parameterName: 'matrix',
  skipIfNoParametersOrOptions: true,
  allowDeprecatedUsage: true,
  wrapper: (getStory, context) => {
    const { errors, component, pattern, backgroundColor, showOriginal } = getParameters(context);
    if (!component || !pattern) {
      return <Error messages={errors} />;
    }
    const storyFn = getStory(context);
    const originalProps = storyFn.props;
    return (
      <>
        {showOriginal && <Box mb={3}>{storyFn}</Box>}
        <Matrix
          component={component}
          matrixPattern={pattern}
          originalProps={originalProps}
          backgroundColor={backgroundColor}
        />
      </>
    );
  },
});
