from base64 import encode
import json
import redis
import zlib


r = redis.Redis(host="localhost", port=6379)


def redis_search(key, calculation, *args, delete=False, log=False):
    if log:
      print(f"Calculating {key}...")

    if delete:
        r.delete(key)

    potential = r.get(key)
    if (potential):
        return json.loads(zlib.decompress(potential))
    else:
        value = calculation(*args)
        r.set(key, zlib.compress(json.dumps(value).encode("utf-8")))
        return value



def redis_get(key):
    return json.loads(zlib.decompress(r.get(key)))


def test_redis():
    r.ping()
