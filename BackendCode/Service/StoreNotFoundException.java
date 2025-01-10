package in.snyce.inventory.service;

public class StoreNotFoundException extends RuntimeException {
  public StoreNotFoundException(String message) {
      super(message);
  }
}