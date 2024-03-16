import { forwardRef } from 'react';

const TextField = forwardRef((props, ref) => {
  return (
    <textarea type="text" value={props.fact} onChange={props.onChange} ref={ref}></textarea>
  );
});

TextField.displayName = 'TextField';

export default TextField;