import React  from 'react';
var PropTypes = require('prop-types');

// Na ndihmon te gjenerojme error nese nuk japin te dhenen duhur.
const Error = ({message}) => (
    <div className={`alert position absolute`} role="alert">

        {message}
    </div>
);

Error.propTypes = {

    message: PropTypes.string,
};
    
Error.defaultProps = {
 
    message: "An error ocurred",
}

 
export default Error;