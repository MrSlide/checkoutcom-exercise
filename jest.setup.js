global.IS_REACT_ACT_ENVIRONMENT = true

// Ensure that dates and times handled consistently regardless of where the tests run
process.env.TZ = 'UTC'
