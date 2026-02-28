"""End-to-end tests for the GET /interactions endpoint."""
import httpx


def test_get_interactions_returns_200(client: httpx.Client) -> None:
    response = client.get("/interactions/")
    assert response.status_code == 200


def test_get_interactions_response_is_a_list(client: httpx.Client) -> None:
    response = client.get("/interactions/")
    assert isinstance(response.json(), list)

def test_filter_returns_empty_when_no_item_id_matches() -> None:
    # Edge Case: The list has items, but none of them match the filter.
    interactions = [_make_log(1, 1, 2), _make_log(2, 2, 3)]
    # Filter for item_id=1, but we only have 2 and 3
    result = _filter_by_item_id(interactions, 1)
    assert result == []


def test_filter_returns_only_matching_interactions_from_mixed_list() -> None:
    # Functional Case: The list contains a mix of matching and non-matching items.
    # IDs: 1 (Match), 2 (No Match), 1 (Match)
    interactions = [_make_log(1, 1, 1), _make_log(2, 2, 2), _make_log(3, 3, 1)]
    result = _filter_by_item_id(interactions, 1)
    
    # Should only return the two items with item_id=1
    assert len(result) == 2
    assert result[0].id == 1
    assert result[1].id == 3


def test_filter_handles_zero_as_valid_id() -> None:
    # Boundary Value: 0 is "falsy" in Python. 
    # This ensures the code checks for `None` explicitly, not just truthiness.
    interactions = [_make_log(1, 1, 0)]
    result = _filter_by_item_id(interactions, 0)
    
    assert len(result) == 1
    assert result[0].item_id == 0


def test_filter_handles_negative_ids() -> None:
    # Boundary Value: IDs can technically be negative integers in some systems.
    interactions = [_make_log(1, 1, -5)]
    result = _filter_by_item_id(interactions, -5)
    
    assert len(result) == 1
    assert result[0].item_id == -5


def test_filter_preserves_multiple_identical_matches() -> None:
    # Edge Case: Multiple different interaction logs that reference the same item_id.
    # Ensures the filter doesn't accidentally de-duplicate the list.
    interactions = [_make_log(1, 1, 100), _make_log(2, 2, 100)]
    result = _filter_by_item_id(interactions, 100)
    
    assert len(result) == 2
    assert result[0].id == 1
    assert result[1].id == 2