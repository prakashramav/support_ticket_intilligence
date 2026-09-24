from pydantic import BaseModel, Field

class TicketRequest(BaseModel):
    text: str = Field(..., min_length=5, max_length=5000, description="The customer support ticket text")

    class Config:
        json_schema_extra = {
            "example": {
                "text": "My payment failed but money was deducted from my account."
            }
        }

class BatchTicketRequest(BaseModel):
    tickets: list[TicketRequest] = Field(..., min_items=1, max_items=100)
