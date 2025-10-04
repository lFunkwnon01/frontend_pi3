# Test del Dropdown - Debugging

## Verificaciones a realizar:

### 1. Verificar que el usuario esté logueado
- Abre la consola del navegador (F12)
- Busca "Current user:" en la consola
- Debe mostrar un objeto con: id, name, email, points, level

### 2. Verificar elementos en el DOM
- Abre las DevTools (F12)
- Ve a la pestaña "Elements" o "Inspector"
- Busca el elemento con `data-slot="dropdown-menu"`
- Haz click en el avatar
- Verifica que aparezca un elemento `data-slot="dropdown-menu-content"`

### 3. Verificar estilos CSS
- Cuando hagas click en el avatar, busca en el DOM un div con clase que incluya "dropdown-menu-content"
- Verifica que no tenga:
  - `display: none`
  - `opacity: 0`
  - `visibility: hidden`
- Verifica que tenga:
  - `z-index: 50` o superior
  - `position: absolute` o `fixed`

### 4. Problemas comunes:

#### Si el usuario no está logueado:
1. Ve a `/auth`
2. Usa: `juan@example.com` / `password`
3. Deberías ser redirigido al dashboard

#### Si el dropdown no se ve:
- Verifica que no haya errores en la consola
- Verifica que las dependencias de Radix UI estén instaladas:
  ```bash
  npm ls @radix-ui/react-dropdown-menu
  ```

#### Si el click no funciona:
- Verifica que el botón sea clickeable (cursor: pointer)
- Verifica que no haya un z-index que lo cubra
- Prueba haciendo click directamente en la imagen del avatar

### 5. Fix alternativo si nada funciona:

Prueba este código simplificado en el navbar:

```tsx
<div className="relative">
  <button 
    onClick={() => setShowMenu(!showMenu)}
    className="relative flex h-8 w-8 rounded-full"
  >
    <Avatar className="h-8 w-8">
      <AvatarImage src={user.avatar} alt={user.name} />
      <AvatarFallback>{user.name[0]}</AvatarFallback>
    </Avatar>
  </button>
  
  {showMenu && (
    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border z-50">
      <div className="p-4">
        <p>{user.name}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
      <hr />
      <button 
        onClick={() => router.push('/settings')}
        className="w-full text-left px-4 py-2 hover:bg-gray-100"
      >
        Configuración
      </button>
      <button 
        onClick={handleLogout}
        className="w-full text-left px-4 py-2 hover:bg-gray-100"
      >
        Cerrar sesión
      </button>
    </div>
  )}
</div>
```

Y agregar al estado: `const [showMenu, setShowMenu] = useState(false)`
