async function {{ $function }}(config, cb) {
    if (cb !== undefined)
        return cb();

}
exports.{{ $function }} = {{ $function }};
;
