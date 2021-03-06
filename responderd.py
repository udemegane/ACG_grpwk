from typing import Optional, Union
from responder import Request as Req, Response as Resp  # type: ignore # noqa


class Request(Req):
    @property
    async def content(self) -> bytes:
        """The Request body, as bytes. Must be awaited."""
        return await super().content  # type: ignore


class Response(Resp):
    def __init__(self, req, *, formats):
        super().__init__(req, formats=formats)
        self.content: Optional[Union[bytes, str]]
        self.mimetype = 'application/x-protobuf'
