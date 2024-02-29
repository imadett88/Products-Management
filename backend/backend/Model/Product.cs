namespace backend.Model
{
    public class Product
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string? Description { get; set; }

        public double Price { get; set;}

        public bool IsAvailable { get; set; }

    }
}
