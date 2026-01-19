using System.Text.Json;

namespace LMS.ClientApp.Utilities
{
    public static class ObjectExtensions
    {

        public static async Task<TModel> DeepCopyAsync<TModel>(this TModel model)
        {
            await using var ms = new MemoryStream();
            await JsonSerializer.SerializeAsync(ms, model);
            ms.Position = 0;
            var res = await JsonSerializer.DeserializeAsync<TModel>(ms);
            return res ?? throw new NullReferenceException("Model is somehow null");
        }

    }
}
