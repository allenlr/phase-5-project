Geocoder.configure(
  # Geocoding options
  timeout: 3,                 # geocoding service timeout (secs)
  lookup: :nominatim,         # name of geocoding service (symbol)

  # IP address geocoding service (for reverse_ip lookup)
  ip_lookup: :ipinfo_io,

  # to use an API key:
  # api_key: 'YOUR_API_KEY',

  # geocoding service request units:
  # :km for kilometers or :mi for miles
  units: :mi,

  # caching (see [Caching](#caching) below for details):
  # cache: Redis.new,
  # cache_prefix: 'geocoder:'
)