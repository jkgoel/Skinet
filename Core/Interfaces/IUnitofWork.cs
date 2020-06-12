using System.Threading.Tasks;
using System;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IUnitofWork : IDisposable
    {
        IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity;

        Task<int> Complete();
    }
}